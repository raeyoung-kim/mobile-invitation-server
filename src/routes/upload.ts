import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import multerS3 from 'multer-s3';
import { s3, getSignedUrl } from '../aws';

const storage = multerS3({
  s3,
  bucket: 'mobile-invitation',
  key: (req, file, cb) => {
    cb(null, `image/${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpeg'].includes(file.mimetype)) cb(null, true);
    else cb(null, false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const router = express.Router();

router.post('/presigned', async (req, res, next) => {
  try {
    const { contentTypes } = req.body;

    if (!Array.isArray(contentTypes)) throw new Error('error');

    const presignedData = await Promise.all(
      contentTypes.map(async (conteType) => {
        const imageKey = `${uuid()}.${mime.extension(conteType)}`;
        const key = `image/${imageKey}`;
        const presigned = await getSignedUrl({ key });
        return { imageKey, presigned };
      })
    );

    res.json(presignedData);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/image',
  upload.array('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        result: req.files,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/image/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await s3.deleteObject(
        {
          Bucket: 'mobile-invitation',
          Key: `image/${req.params.id}`,
        },
        (err, data) => {
          if (err) throw err;
        }
      );

      res.json({
        result: 'ok',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

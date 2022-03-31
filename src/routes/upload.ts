import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import multerS3 from 'multer-s3';
import { s3 } from '../aws';

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

router.post(
  '/image',
  upload.array('image'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('??', req.files);
      res.json({
        result: req.files,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

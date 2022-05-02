import express, { Request, Response, NextFunction } from 'express';
import SampleMain from '../models/SampleMain';
import Sample from '../models/Sample';
import { v4 as uuid } from 'uuid';
import { s3 } from '../aws';
import GuestBook from '../models/GuestBook';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Sample.findOne({ id: req.query.id });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = {
      id: `${uuid()}`,
      ...req.body,
    };

    await Sample.create(result);
    res.json({
      message: 'success',
    });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Sample.updateOne({ id: req.body.id }, req.body.data);
    res.json({
      message: 'success',
    });
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Sample.findOne({ id: req.params.id });

      const { mainPhoto, galleryPictures, kakaoThumbnail, URLThumbnail } = data;

      const imgList = [];

      mainPhoto && imgList.push(mainPhoto);
      kakaoThumbnail && imgList.push(kakaoThumbnail);
      URLThumbnail && imgList.push(URLThumbnail);
      galleryPictures?.length && imgList.concat(galleryPictures);

      await Promise.all(
        imgList.map(async (img) => {
          const id = img.split('/').slice(-1)[0];
          await s3.deleteObject(
            {
              Bucket: 'mobile-invitation',
              Key: `image/${id}`,
            },
            (err, data) => {
              if (err) throw err;
            }
          );
        })
      );

      await Sample.remove({ id: req.params.id });
      await GuestBook.deleteMany({ id: req.params.id });
      res.json({
        message: 'success',
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/main', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await SampleMain.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Sample.find({ userId: req.query.userId });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;

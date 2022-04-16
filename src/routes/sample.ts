import express, { Request, Response, NextFunction } from 'express';
import SampleMain from '../models/SampleMain';
import Sample from '../models/Sample';
import { v4 as uuid } from 'uuid';

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
      result: 'ok',
    });
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Sample.updateOne({ id: req.body.id }, req.body.data);
    res.json({
      result: 'ok',
    });
  } catch (err) {
    next(err);
  }
});

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

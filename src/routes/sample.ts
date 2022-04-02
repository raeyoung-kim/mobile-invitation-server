import express, { Request, Response, NextFunction } from 'express';
import SampleMain from '../models/SampleMain';

const router = express.Router();

router.get('/main', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await SampleMain.find();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      result: 'ok',
    });
  } catch (err) {
    next(err);
  }
});

export default router;

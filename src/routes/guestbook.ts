import express, { Request, Response, NextFunction } from 'express';
import GuestBook from '../models/GuestBook';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const count = await GuestBook.count({ id: req.params.id });
    const limit = Number(req.query.limit) || 4;
    const totalPage = Math.ceil(count / limit);
    const data = await GuestBook.find({ id: req.params.id }, null, {
      limit,
      skip: page * limit,
      sort: {
        date: -1,
      },
    });

    res.json({ data, totalPage });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    await GuestBook.create({
      ...req.body,
      date: new Date(),
      password,
    });
    res.json({
      message: 'success',
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:guestbookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await GuestBook.findOne({ _id: req.params.guestbookId });
      const result = bcrypt.compareSync(req.body.password, find.password);

      if (result) {
        await GuestBook.findOneAndUpdate(
          { _id: req.params.guestbookId },
          { name: req.body.name, message: req.body.message }
        );
        res.json({
          message: 'success',
        });
      } else {
        res.json({
          message: 'fail',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:guestbookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const find = await GuestBook.findOne({ _id: req.params.guestbookId });
      const result = bcrypt.compareSync(req.body.password, find.password);

      if (result) {
        await GuestBook.remove({ _id: req.params.guestbookId });
        res.json({
          message: 'success',
        });
      } else if (req.body.superUser) {
        await GuestBook.remove({ _id: req.params.guestbookId });
        res.json('success');
      } else {
        res.json({
          message: 'fail',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;

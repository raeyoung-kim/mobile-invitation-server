import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import userRouter from './routes/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/user', userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500);
});

app.listen(8080, () => {
  console.log('hello world');
});
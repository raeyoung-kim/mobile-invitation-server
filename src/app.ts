import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

dotenv.config();

import connect from './models';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';
import sampleRouter from './routes/sample';

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/sample', sampleRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500);
});

app.listen(8080, () => {
  console.log('hello world');
});

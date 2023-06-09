import express from 'express';
import cors from 'cors';
import indexRouter from './indexRoute';
import newMatchRouter from './newMatchRoute';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(indexRouter);
app.use(newMatchRouter);

export default app;
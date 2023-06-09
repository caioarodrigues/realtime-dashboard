import express from 'express';
import cors from 'cors';
import indexRouter from './indexRoute';
import newMatchRouter from './newMatchRoute';
import joinMatchRoute from './joinMatchRoute';
import removeRoomRouter from './removeRoomRoute';
import editPonctuationRouter from './editPonctuationRoute';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(indexRouter);
app.use(newMatchRouter);
app.use(joinMatchRoute);
app.use(removeRoomRouter);
app.use(editPonctuationRouter);

export default app;
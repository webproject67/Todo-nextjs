import mongoose from 'mongoose';
import { DEVELOPMENT } from '@/utils/const';

let url = `mongodb+srv://${process.env.LOGIN_DB}:${process.env.PASSWORD_DB}@${process.env.URL_DB}${process.env.NAME_DB}?retryWrites=true&w=majority`;

if (process.env.NODE_ENV === DEVELOPMENT)
  url = `mongodb://127.0.0.1:27017/${process.env.NAME_DB}`;

const dbConnect = mongoose.connect(url);

export default dbConnect;

import mongoose from 'mongoose';

const dbConnect = mongoose.connect(
  `${process.env.URL_DB}${process.env.NAME_DB}`
);

export default dbConnect;

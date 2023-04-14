import mongoose from 'mongoose';

async function db() {
  await mongoose.connect(`${process.env.URL_DB}${process.env.NAME_DB}`);
}

const dbConnect = db().catch(() => console.log('DB query error'));

export default dbConnect;

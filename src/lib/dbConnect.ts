import type { NextApiResponse } from 'next';
import mongoose from 'mongoose';

async function dbConnect(res: NextApiResponse) {
  await mongoose
    .connect(`${process.env.URL_DB}${process.env.NAME_DB}`)
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Ошибка выполнения запроса к базе данных' });
    });
}

export default dbConnect;

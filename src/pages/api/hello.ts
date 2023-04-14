// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await mongoose
    .connect(`${process.env.DB_URL}${process.env.DB_NAME}`)
    .then(() => console.log('Connected!'))
    .catch((err) => console.log(err));

  res.status(200).json({ name: 'John Doe' });
}

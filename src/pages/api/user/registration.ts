import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect;

    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      console.log('email существует в базе');
      return;
    }

    const createUser = await User.create(req.body);
    createUser.save();

    res.status(201).json({});
  } catch (e) {
    console.log('что-то помешало запросу выполниться');
  }
}

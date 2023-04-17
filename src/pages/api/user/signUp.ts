import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(res);

  await User.findOne({ email: req.body.email }).then((findUser) => {
    if (findUser)
      res
        .status(500)
        .json({ message: 'Пользователь с таким email уже зарегистрирован' });
  });

  const hashPassword = await bcrypt.hash(req.body.password, 15);

  User.create({ email: req.body.email, password: hashPassword })
    .then(() => {
      res.status(201).json({});
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Не зарегистрированы, повторите попытку позже' });
    });
}

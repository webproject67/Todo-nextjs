import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
      const token = jwt.sign(req.body, String(process.env.JWT_SECRET), {
        expiresIn: '1d',
      });
      res.status(201).json({ token });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Не зарегистрированы, повторите попытку позже' });
    });
}

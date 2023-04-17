import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(res);

  User.findOne({ email: req.body.email }).then((findUser) => {
    if (!findUser) {
      res.status(500).json({ message: 'Пользователь с таким email не найден' });
    }

    const comparePassword = bcrypt.compareSync(
      req.body.password,
      findUser.password
    );
    if (!comparePassword) res.status(500).json({ message: 'Неверный пароль' });

    res.status(201).json({});
  });
}

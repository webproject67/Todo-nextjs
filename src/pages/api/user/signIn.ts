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

  User.findOne({ email: req.body.email })
    .then((findUser) => {
      if (!findUser) {
        res
          .status(500)
          .json({ message: 'Пользователь с таким email не найден' });
      }

      const comparePassword = bcrypt.compareSync(
        req.body.password,
        findUser.password
      );
      if (!comparePassword)
        res.status(500).json({ message: 'Неверный пароль' });

      const token = jwt.sign(
        { email: req.body.email, password: findUser.password },
        String(process.env.JWT_SECRET),
        {
          expiresIn: '1d',
        }
      );
      res.status(200).json({
        email: req.body.email,
        name: findUser.name,
        surname: findUser.surname,
        token,
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Не удалось войти, повторите попытку позже' });
    });
}

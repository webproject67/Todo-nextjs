import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import createToken from '@/utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  await dbConnect.catch(() =>
    res.status(500).json({ message: 'Ошибка выполнения запроса к базе данных' })
  );

  User.findOne({ email })
    .then((findUser) => {
      if (!findUser) {
        return res
          .status(500)
          .json({ message: 'Пользователь с таким email не найден' });
      }

      const comparePassword = bcrypt.compareSync(password, findUser.password);
      if (!comparePassword)
        return res.status(500).json({ message: 'Неверный пароль' });

      const token = createToken({
        email: findUser.email,
        password: findUser.password,
        name: findUser.name,
        surname: findUser.surname,
      });

      return res.status(200).json({
        email: findUser.email,
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

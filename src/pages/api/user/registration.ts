import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import getHashPassword from '@/utils/bcrypt';
import createToken from '@/utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, authGoogle } = req.body;

  await dbConnect.catch(() =>
    res.status(500).json({ message: 'Ошибка выполнения запроса к базе данных' })
  );

  const hashPassword = await getHashPassword(password);
  const dataUser = { email, password: hashPassword };
  const token = createToken(dataUser);

  await User.findOne({ email }).then((findUser) => {
    if (findUser) {
      if (authGoogle) res.status(200).json({ email, token });
      return res
        .status(500)
        .json({ message: 'Пользователь с таким email уже зарегистрирован' });
    }

    return User.create(dataUser)
      .then(() => {
        res.status(201).json({ email, token });
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: 'Не зарегистрированы, повторите попытку позже' });
      });
  });
}

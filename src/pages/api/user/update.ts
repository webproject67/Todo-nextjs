import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import getHashPassword from '@/utils/bcrypt';
import createToken from '@/utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, name, surname } = req.body;

  await dbConnect.catch(() =>
    res.status(500).json({ message: 'Ошибка выполнения запроса к базе данных' })
  );

  const hashPassword = await getHashPassword(password);

  const token = createToken({
    email,
    password: hashPassword,
    name,
    surname,
  });

  User.updateOne({ email }, { password: hashPassword, name, surname })
    .then(() => {
      res.status(200).json({
        email,
        name,
        surname,
        token,
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Не сохранено, повторите попытку позже' });
    });
}

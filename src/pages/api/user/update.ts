import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import getHashPassword from '@/utils/bcrypt';
import createToken from '@/utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect.catch(() => {
    res
      .status(500)
      .json({ message: 'Ошибка выполнения запроса к базе данных' });
  });

  const hashPassword = await getHashPassword(req.body.password);

  const token = createToken({
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
    surname: req.body.surname,
  });

  User.updateOne(
    { email: req.body.email },
    { password: hashPassword, name: req.body.name, surname: req.body.surname }
  )
    .then(() => {
      res.status(200).json({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        token,
      });
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Не сохранено, повторите попытку позже' });
    });
}

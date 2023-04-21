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

  const hashPassword = await bcrypt.hash(req.body.password, 15);

  const token = jwt.sign(
    {
      email: req.body.email,
      password: hashPassword,
      name: req.body.name,
      surname: req.body.surname,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d',
    }
  );

  try {
    await User.updateOne(
      { email: req.body.email },
      { password: hashPassword, name: req.body.name, surname: req.body.surname }
    );

    res.status(200).json({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Не сохранено, повторите попытку позже' });
  }
}

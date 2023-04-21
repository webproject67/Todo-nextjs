import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { DataType } from '@/types/user';

type TokenType = DataType & {
  iat: number;
  exp: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error('Не авторизован');

    const token = authorizationHeader.split(' ')[1];
    if (!token) throw new Error('Не авторизован');

    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as TokenType;
    res.status(200).json({
      email: decoded.email,
      name: decoded.name || '',
      surname: decoded.surname || '',
    });
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' });
  }
}

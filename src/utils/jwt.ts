import jwt from 'jsonwebtoken';
import { DataType } from '@/types/user';

export default function createToken(data: DataType): string {
  return jwt.sign(data, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
  });
}

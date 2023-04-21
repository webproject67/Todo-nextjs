import bcrypt from 'bcrypt';

export default function getHashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 15);
}

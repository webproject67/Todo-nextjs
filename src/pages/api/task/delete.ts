import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body;

  await dbConnect.catch(() => {
    res
      .status(500)
      .json({ message: 'Ошибка выполнения запроса к базе данных' });
  });

  await Task.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json(id);
    })
    .catch(() => {
      res.status(500).json({ message: 'Не удалось удалить' });
    });
}

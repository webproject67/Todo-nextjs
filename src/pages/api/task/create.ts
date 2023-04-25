import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, user } = req.body;

  await dbConnect.catch(() => {
    res
      .status(500)
      .json({ message: 'Ошибка выполнения запроса к базе данных' });
  });

  await Task.create({ text, user })
    .then((createTask) => {
      res.status(201).json(createTask);
    })
    .catch(() => {
      res.status(500).json({ message: 'Не удалось добавить' });
    });
}

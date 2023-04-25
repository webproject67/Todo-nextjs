import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.body;

  await dbConnect.catch(() => {
    res
      .status(500)
      .json({ message: 'Ошибка выполнения запроса к базе данных' });
  });

  Task.find({ user })
    .then((findTasks) => {
      res.status(200).json(findTasks);
    })
    .catch(() => {
      res.status(500).json({ message: 'Не удалось получить данные с сервера' });
    });
}

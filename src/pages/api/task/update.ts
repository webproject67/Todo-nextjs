import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/task';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, changes } = req.body;

  await dbConnect.catch(() => {
    res
      .status(500)
      .json({ message: 'Ошибка выполнения запроса к базе данных' });
  });

  const newChanges = { ...changes, ...{ updatedAt: new Date() } };

  await Task.findByIdAndUpdate(id, changes)
    .then(() => {
      res.status(200).json({ id, changes: newChanges });
    })
    .catch(() => {
      res.status(500).json({ message: 'Не удалось обновить' });
    });
}

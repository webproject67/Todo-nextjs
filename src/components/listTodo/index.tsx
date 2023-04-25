/* eslint-disable no-underscore-dangle */
import React from 'react';
import cn from 'classnames';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dictionary, EntityId } from '@reduxjs/toolkit';
import convertDate from '@/utils/convertDate';
import ButtonIcon from '@/components/buttonIcon';
import Select from '@/components/select';
import styles from './ListTodo.module.scss';
import { OutputTask, SelectPriority } from '@/types/task';

type Props = {
  tasks: {
    tasksIds: EntityId[];
    tasksEntities: Dictionary<OutputTask>;
  };
  handleSelect: ({ id, priority }: SelectPriority) => void;
  handleClose: (id: string) => void;
  handleDelete: (id: string) => void;
};

const priorities = [
  {
    text: 'Высокий',
    value: '1',
  },
  {
    text: 'Средний',
    value: '2',
  },
  {
    text: 'Низкий',
    value: '3',
  },
];

function ListTodo({ tasks, handleSelect, handleClose, handleDelete }: Props) {
  return (
    <ul className={cn(styles.root)}>
      {tasks.tasksIds.length
        ? tasks.tasksIds.map((data, i) => (
            <li
              className={cn(styles.item)}
              key={tasks.tasksEntities[data]!._id}
            >
              <div className={cn(styles.texts)}>
                <p className={cn(styles.task)}>
                  {i + 1}. {tasks.tasksEntities[data]!.text}
                </p>
                <p className={cn(styles.date)}>
                  Добавлено: {convertDate(tasks.tasksEntities[data]!.createdAt)}
                </p>
                <p className={cn(styles.date)}>
                  Обновлено: {convertDate(tasks.tasksEntities[data]!.updatedAt)}
                </p>
              </div>
              <div className={cn(styles.buttons)}>
                <Select
                  selectId="priority"
                  labelId="priority-label"
                  label="Приоритет"
                  value={tasks.tasksEntities[data]!.priority}
                  options={priorities}
                  size="small"
                  width="small"
                  handleChange={(event) =>
                    handleSelect({
                      id: tasks.tasksEntities[data]!._id,
                      priority: event.target.value,
                    })
                  }
                />
                <ButtonIcon
                  ariaLabel="toggle"
                  handleClick={() =>
                    handleClose(tasks.tasksEntities[data]!._id)
                  }
                >
                  {tasks.tasksEntities[data]!.isClosed ? (
                    <CloseIcon />
                  ) : (
                    <DoneIcon />
                  )}
                </ButtonIcon>
                <ButtonIcon
                  ariaLabel="delete"
                  handleClick={() =>
                    handleDelete(tasks.tasksEntities[data]!._id)
                  }
                >
                  <DeleteIcon />
                </ButtonIcon>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}

export default React.memo(ListTodo);

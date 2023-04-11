import React from 'react';
import cn from 'classnames';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import convertDate from '@/utils/convertDate';
import ButtonIcon from '@/components/buttonIcon';
import Select from '@/components/select';
import styles from './ListTodo.module.scss';

const json = [
  {
    uuid: 'a3a18eb4-9f35-4ebd-bb77-b4ae1a131adf',
    text: '111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111 111',
    priority: '1',
    isClosed: true,
    createdAt: '2023-04-10T13:39:21.677Z',
    updatedAt: '2023-04-10T13:39:21.677Z',
    UserUuid: '84244546-d998-4161-92da-effd1caf0b4e',
  },
  {
    uuid: 'd2aea8db-6c07-43e7-a76b-089b6ebf1e5c',
    text: '222',
    priority: '2',
    isClosed: false,
    createdAt: '2023-04-10T13:32:17.762Z',
    updatedAt: '2023-04-10T13:32:17.762Z',
    UserUuid: '84244546-d998-4161-92da-effd1caf0b4e',
  },
  {
    uuid: '4e704d15-0883-4ad9-93d2-464827b6382a',
    text: '1111',
    priority: '3',
    isClosed: false,
    createdAt: '2023-04-10T13:32:06.351Z',
    updatedAt: '2023-04-10T13:32:06.351Z',
    UserUuid: '84244546-d998-4161-92da-effd1caf0b4e',
  },
];

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

function ListTodo() {
  return (
    <ul className={cn(styles.root)}>
      {json.map((data, i) => (
        <li className={cn(styles.item)} key={data.uuid}>
          <div className={cn(styles.texts)}>
            <p className={cn(styles.task)}>
              {i + 1}. {data.text}
            </p>
            <p className={cn(styles.date)}>
              Добавлено: {convertDate(data.createdAt)}
            </p>
            <p className={cn(styles.date)}>
              Обновлено: {convertDate(data.updatedAt)}
            </p>
          </div>
          <div className={cn(styles.buttons)}>
            <Select
              selectId="priority"
              labelId="priority-label"
              label="Приоритет"
              value={data.priority}
              options={priorities}
              size="small"
              width="small"
              handleChange={() => {}}
            />
            <ButtonIcon ariaLabel="toggle" handleClick={() => {}}>
              {data.isClosed ? <CloseIcon /> : <DoneIcon />}
            </ButtonIcon>
            <ButtonIcon ariaLabel="delete" handleClick={() => {}}>
              <DeleteIcon />
            </ButtonIcon>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(ListTodo);

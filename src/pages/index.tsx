import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectUserData,
  selectAuthorizationStatus,
} from '@/store/user/selectors';
import { selectTasksIds, selectTasksEntities } from '@/store/task/selectors';
import {
  getTasksAction,
  updateTaskAction,
  deleteTaskAction,
} from '@/store/api-actions';
import LayoutPage from '@/containers/layoutPage';
import FormAddTodo from '@/containers/formAddTodo';
import LayoutBox from '@/components/layoutBox';
import ListTodo from '@/components/listTodo';
import Progress from '@/components/progress';
import { AuthorizationStatus } from '@/utils/const';
import { SelectPriority } from '@/types/task';

export default function Home() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const tasksIds = useAppSelector(selectTasksIds);
  const tasksEntities = useAppSelector(selectTasksEntities);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userData = useAppSelector(selectUserData);

  const onSelect = ({ id, priority }: SelectPriority) => {
    dispatch(updateTaskAction({ id, changes: { priority } }));
  };

  const onClose = (id: string) => {
    dispatch(
      updateTaskAction({
        id,
        changes: { isClosed: !tasksEntities[id]!.isClosed },
      })
    );
  };

  const onDelete = (id: string) => {
    dispatch(deleteTaskAction(id));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      router.push('/login');
      return;
    }
    dispatch(getTasksAction({ user: userData.email }));

    setLoading(false);
  }, [authorizationStatus, dispatch, router, userData.email]);

  if (isLoading) {
    return (
      <LayoutBox height="full" display="center">
        <Progress color="primary" />
      </LayoutBox>
    );
  }

  return (
    <>
      <Head>
        <title>Список задач</title>
      </Head>
      <LayoutPage title="Список задач">
        <LayoutBox padding="small" color="light">
          <FormAddTodo />
          <ListTodo
            tasks={{ tasksIds, tasksEntities }}
            handleSelect={onSelect}
            handleClose={onClose}
            handleDelete={onDelete}
          />
        </LayoutBox>
      </LayoutPage>
    </>
  );
}

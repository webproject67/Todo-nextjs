import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAuthorizationStatus } from '@/store/user/selectors';
import LayoutPage from '@/containers/layoutPage';
import FormAddTodo from '@/containers/formAddTodo';
import LayoutBox from '@/components/layoutBox';
import ListTodo from '@/components/listTodo';
import { AuthorizationStatus } from '@/utils/const';

export default function Home() {
  const router = useRouter();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth)
      router.push('/login');
  }, [authorizationStatus, router]);

  return (
    <>
      <Head>
        <title>Список задач</title>
      </Head>
      <LayoutPage title="Список задач">
        <LayoutBox padding="small" color="light">
          <FormAddTodo />
          <ListTodo />
        </LayoutBox>
      </LayoutPage>
    </>
  );
}

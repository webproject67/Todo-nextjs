import Head from 'next/head';
import LayoutPage from '@/containers/layoutPage';
import FormAddTodo from '@/containers/formAddTodo';
import LayoutBox from '@/components/layoutBox';
import ListTodo from '@/components/listTodo';

export default function Home() {
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

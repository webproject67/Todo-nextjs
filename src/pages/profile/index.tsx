import Head from 'next/head';
import LayoutPage from '@/containers/layoutPage';
import FormProfile from '@/containers/formProfile';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Мой профиль</title>
      </Head>
      <LayoutPage title="Мой профиль">
        <FormProfile />
      </LayoutPage>
    </>
  );
}

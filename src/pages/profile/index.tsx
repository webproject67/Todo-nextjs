import Head from 'next/head';
import LayoutPage from '@/containers/layoutPage';
import FormProfile from '@/containers/formProfile';
import LayoutBox from '@/components/layoutBox';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Мой профиль</title>
      </Head>
      <LayoutPage title="Мой профиль">
        <LayoutBox padding="small" color="light">
          <FormProfile />
        </LayoutBox>
      </LayoutPage>
    </>
  );
}

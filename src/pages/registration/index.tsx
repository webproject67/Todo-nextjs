import Head from 'next/head';
import FormRegistration from '@/containers/formRegistration';
import LayoutAuth from '@/components/layoutAuth';

const route = {
  text: 'Есть аккаунт?',
  href: '/login',
};

export default function Registration() {
  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <LayoutAuth route={route}>
        <FormRegistration />
      </LayoutAuth>
    </>
  );
}

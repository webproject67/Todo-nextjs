import Head from 'next/head';
import FormLogin from '@/containers/formLogin';
import LayoutAuth from '@/components/layoutAuth';
import route from './route';

export default function Login() {
  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <LayoutAuth route={route}>
        <FormLogin />
      </LayoutAuth>
    </>
  );
}

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import FormLogin from '@/containers/formLogin';
import LayoutAuth from '@/components/layoutAuth';
import LayoutBox from '@/components/layoutBox';
import Progress from '@/components/progress';
import { getToken } from '@/utils/token';

const route = {
  text: 'Нет аккаунта?',
  href: '/registration',
};

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (getToken()) {
      router.push('/');
      return;
    }

    setLoading(false);
  }, [router]);

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
        <title>Логин</title>
      </Head>
      <LayoutAuth route={route}>
        <FormLogin />
      </LayoutAuth>
    </>
  );
}

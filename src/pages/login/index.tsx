import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAuthorizationStatus } from '@/store/user/selectors';
import FormLogin from '@/containers/formLogin';
import LayoutAuth from '@/components/layoutAuth';
import LayoutBox from '@/components/layoutBox';
import Progress from '@/components/progress';
import { AuthorizationStatus } from '@/utils/const';

const route = {
  text: 'Нет аккаунта?',
  href: '/registration',
};

function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      router.push('/');
      return;
    }

    setLoading(false);
  }, [authorizationStatus, router]);

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

export default React.memo(Login);

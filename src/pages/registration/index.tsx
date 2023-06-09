import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAuthorizationStatus } from '@/store/user/selectors';
import FormRegistration from '@/containers/formRegistration';
import LayoutAuth from '@/components/layoutAuth';
import LayoutBox from '@/components/layoutBox';
import Progress from '@/components/progress';
import { AuthorizationStatus } from '@/utils/const';

const route = {
  text: 'Есть аккаунт?',
  href: '/login',
};

function Registration() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      router.push('/');
      return;
    }

    if (authorizationStatus === AuthorizationStatus.NoAuth) setLoading(false);
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
        <title>Регистрация</title>
      </Head>
      <LayoutAuth route={route}>
        <FormRegistration />
      </LayoutAuth>
    </>
  );
}

export default React.memo(Registration);

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectAuthorizationStatus } from '@/store/user/selectors';
import LayoutPage from '@/containers/layoutPage';
import FormProfile from '@/containers/formProfile';
import LayoutBox from '@/components/layoutBox';
import Progress from '@/components/progress';
import { AuthorizationStatus } from '@/utils/const';

export default function Profile() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      router.push('/login');
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

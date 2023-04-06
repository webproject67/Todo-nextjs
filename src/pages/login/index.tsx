import Head from 'next/head';
import Image from 'next/image';
import cn from 'classnames';
import FormLogin from '@/containers/formLogin';
import Link from '@/components/link';
import styles from '@/styles/Login.module.scss';

export default function Login() {
  return (
    <>
      <Head>
        <title>Логин</title>
      </Head>
      <main className={cn(styles.root)}>
        <Image
          src="/images/svg/logo.svg"
          alt="logo"
          width={130}
          height={100}
          priority
        />
        <FormLogin />
        <Link text="Нет аккаунта?" href="/registration" />
      </main>
    </>
  );
}

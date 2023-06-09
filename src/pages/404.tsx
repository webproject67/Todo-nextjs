import React from 'react';
import Head from 'next/head';
import cn from 'classnames';
import Link from '@/components/link';
import styles from '@/styles/404.module.scss';

function Custom404() {
  return (
    <>
      <Head>
        <title>Ошибка</title>
      </Head>
      <div className={cn(styles.root)}>
        <div className={cn(styles.wrapper)}>
          <h1>404 Ошибка</h1>
          <h2>Не удалось запустить :(</h2>
          <h3>
            Страница не найдена, но можно выйти на{' '}
            <Link
              text="Главную страницу"
              href="/"
              color="secondary"
              underline="none"
            />
          </h3>
        </div>
      </div>
    </>
  );
}

export default React.memo(Custom404);

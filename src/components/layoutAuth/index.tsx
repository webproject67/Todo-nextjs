import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import AuthGoogle from '@/containers/authGoogle';
import Link from '@/components/link';
import styles from './LayoutAuth.module.scss';

type Props = {
  children: React.ReactNode;
  route: {
    text: string;
    href: string;
  };
};

function LayoutAuth({ children, route }: Props) {
  return (
    <main className={cn(styles.root)}>
      <Image
        src="/images/svg/logo.svg"
        alt="logo"
        width={130}
        height={100}
        priority
      />
      {children}
      <Link text={route.text} href={route.href} />
      <AuthGoogle />
    </main>
  );
}

export default React.memo(LayoutAuth);

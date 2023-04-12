import React from 'react';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import cn from 'classnames';
import styles from './Link.module.scss';

type Props = {
  text: string;
  href: string;
  color?: 'primary' | 'secondary';
  underline?: 'none' | 'hover' | 'always';
};

function CustomizationLink({ text, href, color, underline }: Props) {
  return (
    <Link
      className={cn(styles.root, {
        [styles.root_color_primary]: color === 'primary',
        [styles.root_color_secondary]: color === 'secondary',
      })}
      component={NextLink}
      href={href}
      underline={underline}
    >
      {text}
    </Link>
  );
}

CustomizationLink.defaultProps = {
  color: '',
  underline: 'always',
};

export default React.memo(CustomizationLink);

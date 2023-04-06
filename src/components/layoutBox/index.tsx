import React from 'react';
import cn from 'classnames';
import styles from './LayoutBox.module.scss';

type Props = {
  children: React.ReactNode;
  width?: 'full';
  marginBottom?: 'small';
};

function LayoutBox({ children, width, marginBottom }: Props) {
  return (
    <div
      className={cn(styles.root, {
        [styles.root_width_full]: width === 'full',
        [styles.root_marginBottom_small]: marginBottom === 'small',
      })}
    >
      {children}
    </div>
  );
}

LayoutBox.defaultProps = {
  width: '',
  marginBottom: '',
};

export default React.memo(LayoutBox);

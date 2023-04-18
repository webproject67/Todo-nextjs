import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import cn from 'classnames';
import styles from './Progress.module.scss';

type Props = {
  color?: 'primary';
};

function CustomizationProgress({ color }: Props) {
  return (
    <CircularProgress
      className={cn(styles.root, {
        [styles.root_color_primary]: color === 'primary',
      })}
    />
  );
}

CustomizationProgress.defaultProps = {
  color: '',
};

export default React.memo(CustomizationProgress);

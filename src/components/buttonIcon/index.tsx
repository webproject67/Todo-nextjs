import React from 'react';
import IconButton from '@mui/material/IconButton';
import cn from 'classnames';
import styles from './ButtonIcon.module.scss';

type Props = {
  children: React.ReactNode;
  ariaLabel: string;
  position?: 'absolute';
  filled?: 'light';
  isRotated?: boolean;
  handleClick: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function CustomizationButtonIcon({
  children,
  position,
  filled,
  ariaLabel,
  isRotated,
  handleClick,
}: Props) {
  return (
    <IconButton
      className={cn(styles.root, {
        [styles.root_position_absolute]: position === 'absolute',
        [styles.root_filled_light]: filled === 'light',
        [styles.root_transform_rotate]: isRotated,
      })}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </IconButton>
  );
}

CustomizationButtonIcon.defaultProps = {
  position: '',
  filled: '',
  isRotated: false,
};

export default React.memo(CustomizationButtonIcon);

import React from 'react';
import Button from '@mui/material/Button';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  text: string;
  color?: 'primary';
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'text' | 'contained' | 'outlined';
  isDisabled?: boolean;
  handleClick?: () => void;
};

function CustomizationButton({
  text,
  color,
  type,
  variant,
  isDisabled,
  handleClick,
}: Props) {
  return (
    <Button
      className={cn(styles.root, {
        [styles.root_color_primary]: color === 'primary',
      })}
      fullWidth
      type={type}
      variant={variant}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {isDisabled ? 'Loading...' : text}
    </Button>
  );
}

CustomizationButton.defaultProps = {
  color: '',
  type: 'button',
  variant: 'contained',
  isDisabled: false,
  handleClick: () => {},
};

export default React.memo(CustomizationButton);

import Button from '@mui/material/Button';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  text: string;
  color?: 'primary';
  type?: 'button' | 'submit';
  variant?: 'text' | 'contained' | 'outlined';
  handleClick?: () => void;
};

function CustomizationButton({
  text,
  color,
  type,
  variant,
  handleClick,
}: Props) {
  return (
    <Button
      className={cn(styles.root, {
        [styles.root_color_primary]: color === 'primary',
      })}
      type={type}
      variant={variant}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

CustomizationButton.defaultProps = {
  color: '',
  type: 'button',
  variant: 'contained',
  handleClick: () => {},
};

export default CustomizationButton;

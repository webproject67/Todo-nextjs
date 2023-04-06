import React from 'react';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import styles from './TextField.module.scss';

type Props = {
  id: string;
  label: string;
  value: string;
  helperText: string | false | undefined;
  isError: boolean | undefined;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomizationTextField({
  id,
  label,
  value,
  helperText,
  isError,
  placeholder,
  type,
  variant,
  size,
  isDisabled,
  handleChange,
}: Props) {
  return (
    <TextField
      className={cn(styles.root)}
      fullWidth
      id={id}
      name={id}
      label={label}
      value={value}
      helperText={helperText}
      error={isError}
      placeholder={placeholder}
      type={type}
      variant={variant}
      size={size}
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
}

CustomizationTextField.defaultProps = {
  placeholder: '',
  type: 'text',
  variant: 'outlined',
  size: 'medium',
  isDisabled: false,
};

export default React.memo(CustomizationTextField);

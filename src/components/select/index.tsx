import React from 'react';
import cn from 'classnames';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './Select.module.scss';

type Props = {
  selectId: string;
  labelId: string;
  label: string;
  value: string;
  options: {
    value: string;
    text: string;
  }[];
  size?: 'small';
  width?: 'small';
  handleChange: (event: SelectChangeEvent) => void;
};

function CustomizationSelect({
  selectId,
  labelId,
  label,
  value,
  options,
  size,
  width,
  handleChange,
}: Props) {
  return (
    <FormControl
      className={cn(styles.root, {
        [styles.root_width_small]: width === 'small',
      })}
      fullWidth
      size={size}
    >
      <InputLabel id={labelId}>Приоритет</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CustomizationSelect.defaultProps = {
  size: '',
  width: '',
};

export default React.memo(CustomizationSelect);

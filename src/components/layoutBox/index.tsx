import React from 'react';
import cn from 'classnames';
import styles from './LayoutBox.module.scss';

type Props = {
  children: React.ReactNode;
  display?: 'flex' | 'center';
  width?: 'small' | 'half' | 'desktop' | 'full';
  height?: 'full' | 'min';
  marginBottom?: 'small';
  marginLeft?: 'auto';
  padding?: 'small';
  color?: 'light';
};

function LayoutBox({
  children,
  display,
  width,
  height,
  marginBottom,
  marginLeft,
  padding,
  color,
}: Props) {
  return (
    <div
      className={cn(styles.root, {
        [styles.root_display_flex]: display === 'flex',
        [styles.root_display_center]: display === 'center',
        [styles.root_width_small]: width === 'small',
        [styles.root_width_half]: width === 'half',
        [styles.root_width_desktop]: width === 'desktop',
        [styles.root_width_full]: width === 'full',
        [styles.root_height_full]: height === 'full',
        [styles.root_height_min]: height === 'min',
        [styles.root_marginBottom_small]: marginBottom === 'small',
        [styles.root_marginLeft_auto]: marginLeft === 'auto',
        [styles.root_padding_small]: padding === 'small',
        [styles.root_color_light]: color === 'light',
      })}
    >
      {children}
    </div>
  );
}

LayoutBox.defaultProps = {
  display: '',
  width: '',
  height: '',
  marginBottom: '',
  marginLeft: '',
  padding: '',
  color: '',
};

export default React.memo(LayoutBox);

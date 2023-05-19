import React from 'react';
import cn from 'classnames';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LayoutBox from '../layoutBox';
import ButtonIcon from '../buttonIcon';
import styles from './LayoutMain.module.scss';

type Props = {
  children: React.ReactNode;
  title: string;
  isMobileWidth: boolean;
  isOpenDrawer: boolean;
  handleToggleDrawer: (statusOpenDrawer: boolean) => void;
};

function LayoutMain({
  children,
  title,
  isMobileWidth,
  isOpenDrawer,
  handleToggleDrawer,
}: Props) {
  return (
    <main
      className={cn(styles.root, {
        [styles.root_margin_left]: !isMobileWidth && isOpenDrawer,
      })}
    >
      <LayoutBox width="desktop">
        {!isMobileWidth && (
          <ButtonIcon
            ariaLabel="toggle"
            filled="light"
            isRotated={isOpenDrawer}
            handleClick={() => handleToggleDrawer(!isOpenDrawer)}
          >
            <ArrowForwardIosIcon />
          </ButtonIcon>
        )}
        <h2>{title}</h2>
        {children}
      </LayoutBox>
    </main>
  );
}

export default React.memo(LayoutMain);

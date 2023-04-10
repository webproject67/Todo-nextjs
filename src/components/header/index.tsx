import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import MenuIcon from '@mui/icons-material/Menu';
import LayoutBox from '../layoutBox';
import ButtonIcon from '../buttonIcon';
import styles from './Header.module.scss';

type Props = {
  handleToggleDrawer: (
    statusOpenDrawer: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Header({ handleToggleDrawer }: Props) {
  return (
    <header className={cn(styles.root)}>
      <LayoutBox width="desktop">
        <div className={cn(styles.wrapper)}>
          <ButtonIcon
            ariaLabel="menu"
            position="absolute"
            handleClick={handleToggleDrawer(true)}
          >
            <MenuIcon />
          </ButtonIcon>
          <Image
            src="/images/svg/logo.svg"
            alt="logo"
            width={130}
            height={64}
          />
        </div>
      </LayoutBox>
    </header>
  );
}

export default React.memo(Header);

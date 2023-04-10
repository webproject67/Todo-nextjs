import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '@/components/header';
import LayoutBox from '@/components/layoutBox';
import LayoutMain from '@/components/layoutMain';
import Drawer from '@/components/drawer';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function LayoutPage({ children, title }: Props) {
  const isMobileWidth = useMediaQuery('(max-width:767px)');

  const [isOpenDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer =
    (statusOpenDrawer: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      )
        return;

      setOpenDrawer(statusOpenDrawer);
    };

  return (
    <LayoutBox height="full">
      {isMobileWidth && <Header handleToggleDrawer={toggleDrawer} />}
      <LayoutMain
        title={title}
        isMobileWidth={isMobileWidth}
        isOpenDrawer={isOpenDrawer}
        handleToggleDrawer={toggleDrawer}
      >
        {children}
      </LayoutMain>
      <Drawer
        isOpenDrawer={isOpenDrawer}
        variant={isMobileWidth ? 'temporary' : 'persistent'}
        handleToggleDrawer={toggleDrawer}
      />
    </LayoutBox>
  );
}

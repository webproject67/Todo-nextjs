import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '@/components/header';
import LayoutBox from '@/components/layoutBox';
import LayoutMain from '@/components/layoutMain';
import Drawer from '@/components/drawer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import selectLoadingOpenDrawer from '@/store/drawer/selectors';
import { setOpenDrawer } from '@/store/drawer/drawerSlice';
import { logoutAction } from '@/store/api-actions';

type Props = {
  children: React.ReactNode;
  title: string;
};

function LayoutPage({ children, title }: Props) {
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector(selectLoadingOpenDrawer);
  const isMobileWidth = useMediaQuery('(max-width:767px)');

  const [isFirstRender, setFirstRender] = React.useState(true);

  const toggleDrawer = (statusOpenDrawer: boolean) =>
    dispatch(setOpenDrawer(statusOpenDrawer));

  const logout = () => dispatch(logoutAction());

  if (isFirstRender && isMobileWidth) {
    dispatch(setOpenDrawer(false));
    setFirstRender(false);
  }

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
        handleLogout={logout}
      />
    </LayoutBox>
  );
}

export default React.memo(LayoutPage);

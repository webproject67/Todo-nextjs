import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import cn from 'classnames';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './Drawer.module.scss';

type Props = {
  isOpenDrawer: boolean;
  variant?: 'persistent' | 'temporary';
  handleToggleDrawer: (statusOpenDrawer: boolean) => void;
  handleLogout: () => void;
};

const routes = [
  {
    text: 'Мой профиль',
    href: '/profile',
    icon: 'profile',
  },
  {
    text: 'Список задач',
    href: '/',
    icon: 'todo',
  },
];

function CustomizationDrawer({
  isOpenDrawer,
  variant,
  handleToggleDrawer,
  handleLogout,
}: Props) {
  return (
    <Drawer
      className={cn(styles.root)}
      anchor="left"
      open={isOpenDrawer}
      variant={variant}
      onClose={() => handleToggleDrawer(false)}
    >
      <Image src="/images/svg/logo.svg" alt="logo" width={172} height={64} />
      <List>
        {routes.map(({ text, href, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={NextLink} href={href}>
              <ListItemIcon>
                <Image
                  src={`/images/svg/${icon}.svg`}
                  alt="icon"
                  width={20}
                  height={20}
                />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Button} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

CustomizationDrawer.defaultProps = {
  variant: 'temporary',
};

export default React.memo(CustomizationDrawer);

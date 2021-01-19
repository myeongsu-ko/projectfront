import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import axios from 'axios';
import SecStorage from '@lib/secureStorage';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import imgLogoTop from '@assets/images/s-lok-logo.png';
import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import Sidebar from './Sidebar';

const Header = () => {
  const { commonStore, userStore } = useStores();
  const { $Dim, $Title, $storekey, $clearUser } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $Title: commonStore.Title,
    $storekey: userStore.storekey,
    $clearUser: userStore.fClearUser,
  }));

  const Styles = fStyles($Dim);

  const [menuEl, setMenuEl] = useState(null);

  const fClick = (event) => {
    setMenuEl(event.currentTarget);
  };

  const fClose = () => {
    setMenuEl(null);
  };

  const fLogout = async () => {
    try {
      const secureStorage = SecStorage($storekey);
      await $clearUser();
      await secureStorage.removeItem('user_hansun');
      await axios.post('/@/auth/logout');
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      <Box style={Styles.s1} display="flex">
        <Box style={{ width: $Dim * 160 }}>
          <Link to="/">
            <img src={imgLogoTop} alt="logo" style={{ width: $Dim * 60, height: $Dim * 16, padding: $Dim * 4, marginLeft: $Dim * 5 }} />
          </Link>
        </Box>

        <Box style={{ width: $Dim * 760, height: $Dim * 24, fontSize: $Dim * 17, color: '#fff', fontWeight: 'bold' }} display="flex" justifyContent="center" alignItems="center">
          {$Title}
        </Box>
        <Box style={{ width: $Dim * 120, height: $Dim * 24, marginRight: $Dim * 10 }} display="flex" justifyContent="center" alignItems="center" />

        <Box style={{ width: $Dim * 40 }}>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={fClick} style={{ width: $Dim * 40, height: $Dim * 24, fontSize: $Dim * 10 }}>
            <RiLogoutBoxRFill style={{ width: $Dim * 18, height: $Dim * 18, color: '#fff' }} />
          </Button>
          <Menu id="simple-menu" anchorEl={menuEl} keepMounted open={Boolean(menuEl)} onClose={fClose}>
            <MenuItem onClick={fLogout}>로그아웃</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Sidebar/>
    </>
  );
};

const fStyles = ($Dim) => {
  return {
    s1: { width: $Dim * 1000, height: $Dim * 24, background: '#1f1f1f' },
  };
};

export default Header;

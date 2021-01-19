/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import LoginLayout from '@pages/layout/LoginLayout';
import MainLayout from '@pages/layout/MainLayout';
import ErrorLayout from '@pages/layout/ErrorLayout';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { themeStyle } from '@styles/style';
import SecStorage from '@lib/secureStorage';
import axios from 'axios';

import '@root/App.scss';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const THEME = createMuiTheme(themeStyle);

const App = ({ location, history }) => {
  const [view, setView] = useState(false);
  const { commonStore, userStore } = useStores();
  const { $SetDim, $SetKey, $SetUser, $ClearUser } = useObserver(() => ({
    $SetDim: commonStore.fSetDim,
    $SetKey: userStore.fSetKey,
    $SetUser: userStore.fSetUser,
    $ClearUser: userStore.fClearUser,
  }));

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname.startsWith('/error')) {
      document.getElementById('root').classList.remove('BodyMain');
    } else {
      document.getElementById('root').classList.add('BodyMain');
    }
    if (location.pathname.startsWith('/error')) {
      setView(true);
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      try {
        window.addEventListener('resize', () => {
          if (window.innerWidth > 570) {
            $SetDim(window.innerWidth / 1000);
          } else {
            $SetDim(570 / 1000);
          }
        });
        let result1 = await axios.get('/@/auth/store', {});
        if (result1.data) {
          await $SetKey(result1.data);
        } else {
          history.push('/error_500');
          return;
        }
        const secureStorage = SecStorage(result1.data);
        const user = secureStorage.getItem('user_hansun');
        if (!user) {
          setView(true);
          return;
        }
        await $SetUser(JSON.parse(user));
        let result2 = await axios.get('/@/auth/check', {});
        if (result2.statusText !== 'OK') {
          await $ClearUser();
        }
        setView(true);
      } catch (e) {
        await $ClearUser();
        const secureStorage = SecStorage();
        secureStorage.removeItem('user_hansun');
        setView(true);
      }
    })();
  }, []);

  return (
    <>
      {view && (
        <ThemeProvider theme={THEME}>
          {(() => {
            switch (location.pathname) {
              case '/login':
                return <LoginLayout />;
              default:
                if (location.pathname.startsWith('/error')) {
                  return <ErrorLayout />;
                }
                return <MainLayout />;
            }
          })()}
        </ThemeProvider>
      )}
    </>
  );
};
export default withRouter(App);

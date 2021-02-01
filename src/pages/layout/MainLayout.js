/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
// import Interceptor from '@components/common/Interceptor';
import Loading from '@components/common/Loading';
import Header from '@components/layout/Header';
import Alert from '@components/common/Alert';
import Confirm from '@components/common/Confirm';
import Box from '@material-ui/core/Box';
import Interceptor from '@components/common/Interceptor';
import Orderfirm from 'components/common/Orderfirm';

const MainLayout = ({ location, history }) => {
  const { commonStore, userStore, routeStore } = useStores();
  const { $Loading, $Alert, $setAlert, $OrderfirmSearchFunc, $Confirm, $setConfirm, $ConfirmFunc, $user, $routes, $Orderfirm, $setOrderfirm, $OrderfirmFunc } = useObserver(() => ({
    $Loading: commonStore.Loading,
    $Alert: commonStore.Alert,
    $setAlert: commonStore.fSetAlert,
    $Confirm: commonStore.Confirm,
    $setConfirm: commonStore.fSetConfirm,
    $ConfirmFunc: commonStore.ConfirmFunc,
    $user: userStore.user,
    $routes: routeStore.routes,
    $Orderfirm: commonStore.Orderfirm,
    $setOrderfirm: commonStore.fSetOrderfirm,
    $OrderfirmFunc: commonStore.OrderfirmFunc,
    $OrderfirmSearchFunc: commonStore.OrderfirmSearchFunc,
  }));
  const [view, setView] = useState(false);

  useEffect(() => {
    if (!$user || (!$user.userid && location.pathname !== '/login')) {
      history.push('/login');
    }
    if ($user) {
      setView(true);
    }
  }, [$user, location]);

  return (
    <>
      <Interceptor />
      <Alert visible={$Alert.visible} description={$Alert.desc} onConfirm={() => $setAlert({ visible: false })} />
      <Confirm visible={$Confirm.visible} description={$Confirm.desc} onCancel={() => $setConfirm({ visible: false })} onConfirm={$ConfirmFunc} />
      <Orderfirm visible={$Orderfirm.visible} description={$Orderfirm.desc} onCancel={() => $setOrderfirm({ visible: false })} onConfirm={$OrderfirmFunc} onSearch={$OrderfirmSearchFunc} />
      {view && (
        <Box className="LayMain">
          <Loading isActive={$Loading} />
          <Header />

          <Box display="flex" flexDirection="row">
            <Switch>
              {$routes.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.component} />
              ))}
              <Route render={() => <Redirect to="/error_404" />} />
            </Switch>
          </Box>
        </Box>
      )}
    </>
  );
};
export default withRouter(MainLayout);

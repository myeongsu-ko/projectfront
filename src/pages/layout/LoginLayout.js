import React from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Interceptor from '@components/common/Interceptor';
import Loading from '@components/common/Loading';

const LoginLayout = () => {
  const { routeStore, commonStore } = useStores();
  const { $routes, $Loading } = useObserver(() => ({
    $routes: routeStore.routes,
    $Loading: commonStore.Loading,
  }));

  return (
    <>
      <Helmet
        title="HanSun"
        meta={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
      />

      <Interceptor />
      <Loading isActive={$Loading} />
      {/* 라우터를 불러와서 map으로 뿌린다 근데..?? */}
      {$routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </>
  );
};
export default LoginLayout;

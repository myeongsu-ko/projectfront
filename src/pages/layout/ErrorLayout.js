import React from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Route } from 'react-router-dom';

const ErrorLayout = () => {
  const { routeStore } = useStores();
  const { $routes } = useObserver(() => ({
    $routes: routeStore.routes,
  }));

  return (
    <>
      {$routes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </>
  );
};
export default ErrorLayout;

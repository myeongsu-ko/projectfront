import React from 'react';
import { decorate, observable } from 'mobx';
import { Redirect } from 'react-router-dom';

import Login from '@pages/user/Login';
import Error404 from '@pages/common/Error404';
import Error500 from '@pages/common/Error500';
import Main from '@pages/main/Main';

class RouteStore {
  constructor() {
    this.routes = [
      { path: '/', exact: true, component: () => <Redirect to="/main" /> },
      { path: '/login', title: '로그인', component: () => <Login /> },
      { path: '/main', title: '대시보드', component: () => <Main /> },
      { path: '/error_404', title: '에러페이지', component: () => <Error404 /> },
      { path: '/error_500', title: '에러페이지', component: () => <Error500 /> },
    ];
  }
}

decorate(RouteStore, {
  routes: observable,
});

export default RouteStore;

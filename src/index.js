import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@root/App';
import * as serviceWorker from '@root/serviceWorker';
import { Provider } from 'mobx-react';
import RootStore from '@stores/RootStore';
import '@root/index.css';
import '../node_modules/realgrid/dist/realgrid-sky-blue.css'

const rootStore = new RootStore();

ReactDOM.render(
  <Provider {...rootStore}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();

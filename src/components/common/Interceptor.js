/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from 'axios';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';

const Interceptor = () => {
  const { commonStore } = useStores();
  const { $setLoading } = useObserver(() => ({
    $setLoading: commonStore.fSetLoading,
  }));

  useEffect(() => {
    let loadState = false;
    axios.defaults.headers.common['Cache-Control'] = 'no-cache';
    axios.defaults.headers.common['Pragma'] = 'no-cache';
    axios.defaults.headers.get['If-Modified-Since'] = '0';
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axios.interceptors.request.use(
      (config) => {
        loadState = true;
        setTimeout(function () {
          if (loadState) {
            $setLoading(true);
          }
        }, 600);
        return config;
      },
      (error) => {
        loadState = true;
        setTimeout(function () {
          if (loadState) {
            $setLoading(true);
          }
        }, 600);
        return Promise.reject(error);
      },
    );

    // 응답 인터셉터 추가
    axios.interceptors.response.use(
      (response) => {
        loadState = false;
        $setLoading(false);
        return response;
      },
      (error) => {
        loadState = false;
        $setLoading(false);
        return Promise.reject(error);
      },
    );
  }, []);

  return <></>;
};

export default Interceptor;

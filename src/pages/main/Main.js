/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';

const Main = () => {
  const { commonStore } = useStores();
  const { $Dim, $setAlert, $Confirm, $setConfirm, $setConfirmFunc } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $setAlert: commonStore.fSetAlert,
    $Confirm: commonStore.Confirm,
    $setConfirm: commonStore.fSetConfirm,
    $setConfirmFunc: commonStore.fSetConfirmFunc,
  }));

  const Styles = fStyles($Dim);

  const fAlert = () => {
    $setAlert({ visible: true, desc: 'Alert 테스트' });
    return;
  };

  const fData = async () => {
    try {
      let result = await axios.get('/@/test/selectByMinorList', {
        params: { Minor: '100' },
      });
      console.log(result.data);
      // const result2 = await axios.post(`/@/stocklist/updateByStockMove`, {
      //   data: {aa: 11, bb: 22},
      // });
    } catch (error) {
      if (error.response.status === 404) {
        $setAlert({ visible: true, desc: '해당 코드가 없습니다.' });
      } else {
        $setAlert({ visible: true, desc: '조회중 오류가 발생하였습니다.' });
      }
    }
  };

  const fConfirm = () => {
    $setConfirm({
      visible: true,
      desc: '납품자료를 저장 하시겠습니까?',
      id: 'save',
    });
  };

  const fConfirmFunc = async () => {
    $setConfirmFunc(async () => {
      $setConfirm({ visible: false, desc: '', id: '' });
      if ($Confirm.id === 'save') {
        console.log('저장완료');
      }
    });
  };

  useEffect(() => {
    fConfirmFunc();
  }, [$Confirm]);

  return (
    <>
      <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
        <Box style={{ width: $Dim * 500, height: $Dim * 200, marginTop: $Dim * 20 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Button variant="contained" style={{ width: $Dim * 300, height: $Dim * 70, fontSize: $Dim * 25, backgroundColor: '#323232', color: '#ffffff' }} onClick={fAlert}>
            Alert
          </Button>
          <Button variant="contained" style={{ width: $Dim * 300, height: $Dim * 70, marginTop: $Dim * 10, fontSize: $Dim * 25, backgroundColor: '#323232', color: '#ffffff' }} onClick={fConfirm}>
            Confirm
          </Button>
          <Button variant="contained" style={{ width: $Dim * 300, height: $Dim * 70, marginTop: $Dim * 10, fontSize: $Dim * 25, backgroundColor: '#323232', color: '#ffffff' }} onClick={fData}>
            DATA
          </Button>
        </Box>
      </Box>
    </>
  );
};

const fStyles = ($Dim) => {
  return {
    s1: { width: $Dim * 1000, height: $Dim * 550, background: '#fff' },
  };
};

export default withRouter(Main);

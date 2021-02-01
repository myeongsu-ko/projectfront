import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import { Box, Button } from '@material-ui/core'; //Button
import useStores from '@stores/useStores';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';

const Order = () => {
  const { commonStore } = useStores();
  const { $Dim, $Orderfirm, $setOrderfirm, $setOrderfirmFunc, $setOrderfirmSearchFunc } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $Confirm: commonStore.Confirm,
    $setConfirm: commonStore.fSetConfirm,
    $setConfirmFunc: commonStore.fSetConfirmFunc,
    $Orderfirm: commonStore.Orderfirm,
    $setOrderfirm: commonStore.fSetOrderfirm,
    $setOrderfirmFunc: commonStore.fSetOrderfirmFunc,
    $setOrderfirmSearchFunc: commonStore.fSetOrderfirmSearchFunc,
  }));
  const Styles = fStyles($Dim);
  const [arrayData, setArrayData] = useState();
  const fOrderfirm = async () => {
    try {
      $setOrderfirm({
        visible: true,
        desc: 'aaaa?',
        id: 'save',
      });
      let result = await axios.get('/@/test/select1', {
        params: { Minor: '062', Item1: '061001', Minornm: 'g' },
      });
      console.log('와우', result.data);
      setArrayData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fOrderfirmFunc = async () => {
    $setOrderfirmFunc(async () => {
      $setOrderfirm({ visible: false, desc: '', id: '' });
      if ($Orderfirm.id === 'save') {
        console.log('저장완료');
      }
    });
    console.log('여기뭐고', $Orderfirm.id);
    $setOrderfirmSearchFunc(async () => {
      // $setOrderfirm({ visible: true, desc: '', id: '' });
      // if ($Orderfirm.id === 'search') {
      //   console.log('조회완료');
      // }
    });
  };

  useEffect(() => {
    console.log('여기 실행됨');
    fOrderfirmFunc();
  }, [$Orderfirm]);
  console.log(1,arrayData);
  return (
    <>
      <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
        <Box style={{ height: $Dim * 30 }} />
        <Box style={{ width: $Dim * 500, height: $Dim * 20, marginTop: $Dim * 20 }} display="flex" flexDirection="column" alignItems="center">
          <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button onClick={() => {}} variant="contained" style={{ marginRight: $Dim * 5 }}>
              초기화
            </Button>
            <Button variant="contained" style={{ marginRight: $Dim * 5 }}>
              품번확인
            </Button>
          </Box>
        </Box>

        <Box style={{ width: $Dim * 500, height: $Dim * 200, marginTop: $Dim * 20 }} display="flex" flexDirection="column" alignItems="center">
          <Box style={{ display: 'flex', fontSize: $Dim * 10, alignItems: 'center' }}>
            <div>
              <div>소분류 :</div>
              <FormControl onClick={fOrderfirm} fullWidth variant="outlined" style={{ width: $Dim * 400 }}>
                <InputLabel htmlFor="outlined-adornment-amount" />
                <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
              </FormControl>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const fStyles = ($Dim) => {
  return {
    s1: { width: $Dim * 1000, height: $Dim * 550, background: '#fff' },
    s2: { width: $Dim * 450, height: $Dim * 250, marginBottom: $Dim * 150, marginTop: $Dim * 220 },
  };
};

export default withRouter(Order);

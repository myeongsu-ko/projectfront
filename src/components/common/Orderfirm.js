import React, { useRef, useEffect, useState } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';
// import axios from 'axios';

const Orderfirm = ({ visible, confirmText = '확인', cancelText = '취소', onConfirm, onCancel }) => {
  const { commonStore } = useStores();
  const { $Dim, $Orderfirm, $setOrderfirm, $setOrderfirmFunc } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $Orderfirm: commonStore.Orderfirm,
    $setOrderfirm: commonStore.fSetOrderfirm,
    $setOrderfirmFunc: commonStore.fSetOrderfirmFunc,
  }));
  // console.log(1,onConfirm)
  const btnRef = useRef(null);
  const [arrayData, setArrayData] = useState();
  const [write, setWrite] = useState({
    search: '',
  });
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
  const fOrderfirmFunc = async () => {
    $setOrderfirmFunc(async () => {
      $setOrderfirm({ visible: false, desc: '', id: '' });
      if ($Orderfirm.id === 'save') {
        console.log('저장완료');
      }
      if ($Orderfirm.id === 'search') {
        console.log('조회완료');
      }
    });
  };

  const fSearchfirm = () => {
    $setOrderfirm({
      visible: true,
      desc: 'aaaa?',
      id: 'search',
    });
  };

  // const fConfirmFunc = async () => {
  //   try {
  //     let result = await axios.get('/@/test/select1', {
  //       params: { Minor: '062', Item1: '061001', Minornm: '' },
  //     });
  //     console.log('와우', result.data);
  //     // setArrayData(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fConfirmFunc();
    fOrderfirmFunc();
    if (visible) {
      btnRef.current.focus();
    }
  }, [visible, $Orderfirm]);

  if (!visible) return null;

  return (
    <>
      <Box style={{ position: 'fixed', zIndex: 2000, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.25)' }} display="flex" justifyContent="center" alignItems="center">
        <Box style={{ height: $Dim * 300, width: $Dim * 250, background: '#fff', borderRadius: '4px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.125)' }}>
          <Box style={{ background: '#e6e6e6', padding: $Dim * 5, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} display="flex">
            <img src={imgLogo} alt="logo" style={{ width: $Dim * 40 }} />
          </Box>
          <Box style={{ padding: $Dim * 8 }}>
            <Box style={{ marginTop: $Dim * 10, marginBottom: $Dim * 20 }}>
              <Box style={{ height: $Dim * 211, fontSize: $Dim * 10, fontWeight: 'bold' }}>
                <Box>
                  <TextField id="outlined-basic" name="search" placeholder="검색어를 입력하세요" variant="outlined" style={{ width: $Dim * 150 }} onChange={inputHandle} />
                  <Button
                    onClick={fSearchfirm}
                    variant="contained"
                    style={{ marginLeft: $Dim * 15, width: $Dim * 60, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }}
                  >
                    조회
                  </Button>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <table>
                    <thead>
                      <tr>
                        {arrayData.map((array, index) => (
                          <th key={index}>{index}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {arrayData.map((array, index) => (
                        <tr key={index}>
                          <td>{array.Minor}</td>
                          <td>{array.Minorcd}</td>
                          <td>{array.Minornm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: 'red', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onCancel} ref={btnRef}>
                {cancelText}
              </Button>
              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onConfirm}>
                {confirmText}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Orderfirm;

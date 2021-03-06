import React, { useRef, useEffect } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';

const Confirm = ({ visible, description, confirmText = '확인', cancelText = '취소', onConfirm, onCancel }) => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));

  const btnRef = useRef(null);

  useEffect(() => {
    if (visible) {
      btnRef.current.focus();
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <>
      <Box style={{ position: 'fixed', zIndex: 2000, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.25)' }} display="flex" justifyContent="center" alignItems="center">
        <Box style={{ width: $Dim * 200, background: '#fff', borderRadius: '4px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.125)' }}>
          <Box style={{ background: '#e6e6e6', padding: $Dim * 5, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} display="flex">
            <img src={imgLogo} alt="logo" style={{ width: $Dim * 40 }} />
          </Box>
          <Box style={{ padding: $Dim * 8 }}>
            <Box style={{ marginTop: $Dim * 10, marginBottom: $Dim * 20 }}>
              <Box style={{ fontSize: $Dim * 10, fontWeight: 'bold' }}>{description}</Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                style={{ width: $Dim * 40, height: $Dim * 20, marginRight: $Dim * 5, backgroundColor: '#ff6666', fontSize: $Dim * 10, color: '#ffffff' }}
                onClick={onCancel}
                ref={btnRef}
              >
                {cancelText}
              </Button>
              <Button variant="contained" style={{ width: $Dim * 40, height: $Dim * 20, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onConfirm}>
                {confirmText}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Confirm;

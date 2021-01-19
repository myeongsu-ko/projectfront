import React from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, CircularProgress, Backdrop } from '@material-ui/core';

const LoadingSpinner = ({ isActive = false }) => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));

  return (
    <>
      <Backdrop style={{ zIndex: 99999, color: '#fff' }} open={isActive}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box>
            <CircularProgress style={{ width: $Dim * 40, height: $Dim * 40 }} color="inherit" />
          </Box>
          <Box style={{ marginTop: $Dim * 5, fontSize: $Dim * 12 }}>잠시만 기다려 주세요</Box>
        </Box>
      </Backdrop>
    </>
  );
};

export default LoadingSpinner;

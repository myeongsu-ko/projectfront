import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';

const Error404 = () => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));

  return (
    <>
      <Box style={{ width: $Dim * 1000, height: $Dim * 250, background: '#c2c2c2' }} display="flex" justifyContent="center" alignItems="flex-end">
        <Box style={{ fontSize: $Dim * 80 }}>404</Box>
      </Box>
      <Box style={{ width: $Dim * 1000, height: $Dim * 250, paddingTop: $Dim * 10, background: '#2d353c' }} display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
        <Box style={{ fontSize: $Dim * 20, color: '#fff' }}>페이지를 찾을 수 없습니다...</Box>
        <Box style={{ fontSize: $Dim * 12, marginTop: $Dim * 4, color: '#727272' }}>요청하신 페이지가 존재하지 않습니다.</Box>
        <Box style={{ fontSize: $Dim * 12, marginTop: $Dim * 2, color: '#727272' }}>주소를 다시 한번 확인하여 주세요.</Box>

        <Link to="/" style={{ textDecoration: 'none', marginTop: $Dim * 8 }}>
          <Button style={{ width: $Dim * 80, height: $Dim * 20, background: '#00acac', color: '#fff', fontSize: $Dim * 12, borderRadius: '6px' }}>홈으로 이동</Button>
        </Link>
      </Box>
    </>
  );
};

export default withRouter(Error404);

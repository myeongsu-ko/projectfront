import React, { useState } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const GetSearch = ({props, popupHandle2}) => {
  const classes = useStyles();

  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));

  // const btnRef = useRef(null);
  const [write, setWrite] = useState({
    search: '',
  });
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
  console.log(write);


  return (
    <>
      {console.log('여기도 들옴')}
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
                    onClick={() => {
                      props.searchHandle();
                      props.setData(write);
                    }}
                    variant="contained"
                    style={{ marginLeft: $Dim * 15, width: $Dim * 60, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }}
                  >
                    조회
                  </Button>
                </Box>
                {/* <div style={{ display: 'flex' }}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">코드명</StyledTableCell>
                          <StyledTableCell align="center">품번항목</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getArrayData &&
                          getArrayData.map((data) => (
                            <StyledTableRow style={{ height: '' }} key={data.Minorcd}>
                              <StyledTableCell align="center">{data.Minornm}</StyledTableCell>
                              <StyledTableCell align="center">{data.Minornm.slice(0, 1)}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div> */}
                {/* 테이블 들어갈 자리 */}
              </Box>
            </Box>{' '}
            {/* 내용부분 */}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                style={{ flexgrow: 0.5, width: $Dim * 100, height: $Dim * 30, backgroundColor: 'red', fontSize: $Dim * 10, color: '#ffffff' }}
                onClick={() => props.setPopupShow(false)}
              >
                닫기
              </Button>

              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }} onClick={() => {}}>
                확인
              </Button>
            </Box>
            {/* 버튼부분 */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GetSearch;

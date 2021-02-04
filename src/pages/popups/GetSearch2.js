import React, { useState, useEffect, useRef } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { GridView, LocalDataProvider, ValueType } from 'realgrid';

const GetSearch2 = ({ iconHandle, resetHandle, setSize, bore, visible2, setVisible2 }) => {
  const { commonStore } = useStores();
  const { $Dim, $setAlert } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $setAlert: commonStore.fSetAlert,
  }));
  const fAlert = () => {
    $setAlert({ visible: true, desc: '행을 클릭하세요' });
    return;
  };
  let provider = useRef(null);
  let gridView = useRef(null);
  const [write, setWrite] = useState({
    search: '%',
  });
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
  const [data, setData] = useState();
  useEffect(() => {
    size.current = null;
  }, [resetHandle]);

  useEffect(() => {
    size.current = null;
  }, [iconHandle]);
  const size = useRef(null);

  //확인버튼 클릭 시
  const onConfirm = () => {
    if (data === null) {
      fAlert();
    } else {
      setSize(data);
      setVisible2(false);
      setWrite({
        search: '%',
      });
    }
  };

  //취소버튼 클릭 시
  const onCancel = () => {
    setVisible2(false);
    setWrite({
      search: '%',
    });
    // setSubclass('');
  };

  //테이블실행 및 조회
  const exam = async () => {
    if (bore === null) {
      let result = await axios.get('/@/test/select2', {
        params: { Minor: visible2.Minor, likes: write.search },
      });
      provider.current.setRows(result.data);
    } else {
      let result = await axios.get('/@/test/select2_1', {
        params: { Minor: visible2.Minor, likes: write.search, Item3: bore.Remark }, //////////////////////////////////////
      });
      provider.current.setRows(result.data);
    }
  };

  useEffect(() => {
    if (visible2) {
      provider.current = new LocalDataProvider();
      gridView.current = new GridView('realgrid');
      gridView.current.setDataSource(provider.current);
      provider.current.setFields(fields);
      gridView.current.setColumns(columns);
      const height = gridView.current.displayOptions.rowHeight;
      gridView.current.displayOptions.rowHeight = height + 40;
      gridView.current.displayOptions.selectionStyle = 'rows';
      gridView.current.columnByName('Minornm').editable = false;
      gridView.current.columnByName('Remark').editable = false;
      gridView.current.sortingOptions.enabled = false;
      gridView.current.setCheckBar({
        visible: false,
      });
      gridView.current.setStateBar({
        visible: false,
      });
      registerCallback();
      // fCount();
      exam();
    }
  }, [visible2]);

  function registerCallback() {
    gridView.current.onCellClicked = function (grid, clickData) {
      setData(gridView.current.getValues(clickData.itemIndex));
    };
  }

  if (!visible2) return null;
  return (
    <>
      <Box style={{ position: 'fixed', zIndex: 2000, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.25)' }} display="flex" justifyContent="center" alignItems="center">
        <Box style={{ height: $Dim * 400, width: $Dim * 250, background: '#fff', borderRadius: '4px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.125)' }}>
          <Box style={{ background: '#e6e6e6', padding: $Dim * 5, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} display="flex">
            <img src={imgLogo} alt="logo" style={{ width: $Dim * 40 }} />
          </Box>
          <Box style={{ padding: $Dim * 8 }}>
            <Box style={{ marginTop: $Dim * 10, marginBottom: $Dim * 20 }}>
              <Box style={{ height: $Dim * 300, fontSize: $Dim * 10, fontWeight: 'bold' }}>
                <Box>
                  <TextField id="outlined-basic" name="search" placeholder="검색어를 입력하세요" variant="outlined" style={{ width: $Dim * 150 }} onChange={inputHandle} />
                  <Button onClick={exam} variant="contained" style={{ marginLeft: $Dim * 15, width: $Dim * 60, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }}>
                    조회
                  </Button>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <div id="realgrid" style={{ width: '435px', height: '500px' }} />
                </Box>
              </Box>
            </Box>{' '}
            {/* 내용부분 */}
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" style={{ flexgrow: 0.5, width: $Dim * 100, height: $Dim * 30, backgroundColor: 'red', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onCancel}>
                닫기
              </Button>

              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onConfirm}>
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

const fields = [
  {
    fieldName: 'Minornm',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Remark',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Item2',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Item3',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Minorcd',
    dataType: ValueType.TEXT,
  },
];

const columns = [
  {
    name: 'Minornm',
    fieldName: 'Minornm',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '코드명',
      showTooltip: true,
      tooltip: '<span style="color: red;">이름</span>',
    },
    renderer: {
      type: 'text',
      showTooltip: true,
    },
  },
  {
    name: 'Remark',
    fieldName: 'Remark',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '품번항목',
      showTooltip: false,
    },
    numberFormat: '0',
  },
  {
    name: 'Item2',
    fieldName: 'Item2',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '단위',
      showTooltip: false,
    },
    numberFormat: '0',
  },
  {
    name: 'Item3',
    fieldName: 'Item3',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: 'BORE',
      showTooltip: false,
    },
    numberFormat: '0',
  },
];

export default GetSearch2;

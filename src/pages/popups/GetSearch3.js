import React, { useState, useEffect, useRef } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { GridView, LocalDataProvider } from 'realgrid';
import { ValueType } from 'realgrid';

const GetSearch3 = ({ visible3, setVisible3, setStgrade }) => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));
  let provider = useRef(null);
  let gridView = useRef(null);
  const [write, setWrite] = useState('%');
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
  const [data, setData] = useState();
  const [minorcd, setMinorcd] = useState();
  const size = useRef(null);
  const stgrade = useRef(null);

  //취소버튼 클릭 시
  const onCancel = () => {
    setVisible3(false);
    // setSubclass('');
  };

  //첫 테이블 뿌리는거
  const fCount = async () => {
    try {
      if (size !== null) {
        let result = await axios.get('/@/test/select3', {
          params: { likes: '%' },
        });
        console.log('size데이터', result.data);
        provider.current.setRows(result.data);
        stgrade.current = result.data;
      }
    } catch (error) {
      console.log(1, error);
    }
  };

  const onConfirm = () => {
    setStgrade(data.Minornm);
    setVisible3(false);
  };

  useEffect(() => {
    if (visible3) {
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
      gridView.current.setCheckBar({
        visible: false,
      });
      gridView.current.setStateBar({
        visible: false,
      });
      registerCallback();
      fCount();
    }
  }, [visible3]);
  function registerCallback() {
    gridView.current.onCellClicked = function (grid, clickData) {
      console.log('클릭시 데이터', gridView.current.getValues(clickData.itemIndex));
      setData(gridView.current.getValues(clickData.itemIndex));
      setMinorcd(gridView.current.getValues(clickData.itemIndex).Minorcd);
      // setRemark(gridView.current.getValues(clickData.itemIndex).Remark);
    };
  }

  if (!visible3) return null;
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
                  <Button
                    onClick={() => {}}
                    variant="contained"
                    style={{ marginLeft: $Dim * 15, width: $Dim * 60, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }}
                  >
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
    fieldName: 'Item1',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Item2',
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
    name: 'Item1',
    fieldName: 'Item1',
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
    name: 'Item2',
    fieldName: 'Item2',
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
export default GetSearch3;

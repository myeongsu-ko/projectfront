/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
// eslint-disable-next-line import/no-duplicates
import { GridView, LocalDataProvider } from 'realgrid';
// eslint-disable-next-line import/no-duplicates
import { ValueType } from 'realgrid';

const GetSearch = ({
  setVisible,
  visible,
  testArr,
}) => {
  const { commonStore } = useStores();
  const { $Dim, $setAlert } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $setAlert: commonStore.fSetAlert,
  }));
  const fAlert = () => {
    $setAlert({ visible: true, desc: '데이터를 선택하지않았습니다' });
    return;
  };
  const fAlert2 = () => {
    $setAlert({ visible: true, desc: '위의 정보에 해당하는 데이터가 없습니다' });
    return;
  };

  //클릭한 데이터 값 저장
  const [data, setData] = useState(null);


  //취소버튼 클릭 시
  const onCancel = () => {
    setVisible(false)
    setWrite({
      search: ''
    })
  };

  //테이블실행 및 조회
  const exam = async () =>{
    try{
    if(visible.Minor === '502' || visible.Minor === '503'){
      let result = await axios.get('/@/test/select1_1', {
        params: { Minor: visible.Minor, Item1: visible.Item1, Item2: visible.Item2 ,Minornm: write.search },
      });
      provider.current.setRows(result.data);
    }else{
    let result = await axios.get('/@/test/select1', {
      params: { Minor: visible.Minor, Item1: visible.Item1, Minornm: write.search },
    });
    provider.current.setRows(result.data);
  }
}catch(error){
  console.log(error);
  fAlert2();
}
  }

  //확인시 
  const exam2 =() =>{
   if(data === null){
    fAlert();
   }else{
    if(visible.Minor === '062'){
      testArr.setSubclass(data);
      testArr.setPart(null)
      testArr.setStem(null)
      testArr. setDisc(null)
    }
    if(visible.Minor === '499'){
      testArr. setPart(data);
    }
    if(visible.Minor === '498'){
      testArr. setType(data);
    }
    if(visible.Minor === '503'){
      testArr. setDisc(data);
    }
    if(visible.Minor === '505'){
      testArr. setRating(data)
    }
    if(visible.Minor === '501'){
      testArr. setSeat(data);
    }
    if(visible.Minor === '502'){
      testArr. setStem(data);
    }
    if(visible.Minor === '504'){
      testArr. setSpecial(data);
    }
    if(visible.Minor === '506'){
      testArr. setBore(data);
      testArr.setSize(null);
    }
    if(visible.Minor === '508'){
      testArr.setEnd(data);
    }
    if(visible.Minor === '063'){
      testArr.setBody(data)
    }
    setData(null);
    setWrite({
      search :'%'
    });
    setVisible(false)
  }

  }

 
  const [write, setWrite] = useState({
    search: '%'
  });
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
 
  let provider = useRef(null);
  let gridView = useRef(null);

  useEffect(() => {
    if (visible) {
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
      exam();
    }
  }, [visible]);
  function registerCallback() {
    gridView.current.onCellClicked = function (grid, clickData) {
      setData(gridView.current.getValues(clickData.itemIndex));

    };
  }

  if (!visible) return null;
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
                    onClick={() => {
                      exam();
                    }}
                    variant="contained"
                    style={{ marginLeft: $Dim * 15, width: $Dim * 60, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }}
                  >
                    조회
                  </Button>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <div id="realgrid" style={{ width: '435px', height: '500px', marginTop: 20 }} />
                </Box>
              </Box>
            </Box>{' '}
            {/* 내용부분 */}
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" style={{ flexgrow: 0.5, width: $Dim * 100, height: $Dim * 30, backgroundColor: 'red', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onCancel}>
                닫기
              </Button>

              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: '#348fe2', fontSize: $Dim * 10, color: '#ffffff' }} onClick={exam2}>
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

//그리드 컬럼및 필드
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
    fieldName: 'Minorcd',
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
    width: '300',
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
];

export default GetSearch;
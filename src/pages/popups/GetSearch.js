import React, { useState, useEffect, useRef } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { GridView, LocalDataProvider } from 'realgrid';
import { ValueType } from 'realgrid';

const GetSearch = ({ showView4, setShowView4, setType, showView3, setShowView3, setPart, showView2, setShowView2, showView, setShowView, setSubclass, setVisible, visible }) => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));

  //취소버튼 클릭 시
  const onCancel = () => {
    setVisible(false);
    // setSubclass('');
  };

  //확인버튼 클릭 시
  const onConfirm = () => {
    if (subClass.current !== null && Part.current === null) {
      console.log('여기 들간다')
      setSubclass(data);
      setVisible(false);
    }

    if(Part.current !== null && subClass.current !== null){
      console.log('여기도 들간다')
      setPart(data);
      setVisible(false);
    }

    
    //밑에 칸이 있다면 이 함수를 실행(3번째 칸 열지말지)
    if (showView) {
      console.log('리마크 보자', remark);
      if (remark !== 'BD') {
        setShowView2(true);
      } else {
        setShowView3(true);
      }
      if (showView2 === false) {
        setPart(data);
      }
    }
    if (showView2) {
      if (showView4 === false) {
        setType(data);
      }

      setShowView4(true);
    }
  };

  let provider = useRef(null);
  let gridView = useRef(null);

  const [write, setWrite] = useState('%');
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };

  //리스트
  const [data, setData] = useState();
  const [minorcd, setMinorcd] = useState();
  const [remark, setRemark] = useState();
  const subClass = useRef(null);
  const Part = useRef(null);

  //첫 테이블 뿌리는거
  const fCount = async () => {
    try {
      if (subClass.current === null ) {
        console.log('에러??');
        let result = await axios.get('/@/test/select1', {
          params: { Minor: '062', Item1: '061001', Minornm: '%' },
        });
        provider.current.setRows(result.data);
        subClass.current = result.data;
      }
      if (subClass.current !== null) {
        let result2 = await axios.get('/@/test/select1', {
          params: { Minor: '499', Item1: minorcd, Minornm: '%' },
        });
        provider.current.setRows(result2.data);
        Part.current = result2.data;
        setWrite('%');
        // setData(result.data)
      }
    } catch (error) {
      console.log(1, error);
    }
  };

  //조회버튼
  const fCount2 = async () => {
    try {
      if (Part.current === null) {
        let result1 = await axios.get('/@/test/select1', {
          params: { Minor: '062', Item1: '061001', Minornm: write.search },
        });
        provider.current.setRows(result1.data);
      } 
      if (Part.current !== null) {
        let result2 = await axios.get('/@/test/select1', {
          params: { Minor: '499', Item1: minorcd, Minornm: write.search },
        });
        provider.current.setRows(result2.data);
      } 
      setWrite('%');
    } catch (error) {
      console.log(1, error);
    }
  };


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
      gridView.current.setCheckBar({
        visible: false,
      });
      gridView.current.setStateBar({
        visible: false,
      });
      registerCallback();
    }

    fCount();

    // if (showView !== false) {
    //   console.log('여기들어옴');
    //   fCount3();
    // }
    // if (showView4 !== false){
    //   console.log('여기들어옴');
    //   fCount4();
    // }
  }, [visible]);

  function registerCallback() {
    gridView.current.onCellClicked = function (grid, clickData) {
      setData(gridView.current.getValues(clickData.itemIndex).Minornm);
      setMinorcd(gridView.current.getValues(clickData.itemIndex).Minorcd);
      setRemark(gridView.current.getValues(clickData.itemIndex).Remark);
    };
  }
  //visible이 false 이면 null 리턴
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
                      fCount2();
                    }}
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
  // //테이블 뿌리기2
  // const fCount3 = async () => {
  //   try {
  //     if (subClass.current !== null) {
  //       let result = await axios.get('/@/test/select1', {
  //         params: { Minor: '499', Item1: minorcd, Minornm: '%' },
  //       });
  //       provider.current.setRows(result.data);
  //       setWrite('%');
  //       // setData(result.data);
  //     } else {
  //       let result2 = await axios.get('/@/test/select1', {
  //         params: { Minor: '498', Item1: minorcd, Minornm: '%' },
  //       });
  //       provider.current.setRows(result2.data);
  //       setWrite('%');
  //       // setData(result.data);
  //     }
  //   } catch (error) {
  //     console.log(1, error);
  //   }
  // };
  // const fCount4 = async () => {
  //   try {
  //     let result = await axios.get('/@/test/select1', {
  //       params: { Minor: '063', Item1: '%', Minornm: '%' },
  //     });
  //     provider.current.setRows(result.data);
  //     setWrite('%');
  //     // setData(result.data);
  //   } catch (error) {
  //     console.log(1, error);
  //   }
  // };
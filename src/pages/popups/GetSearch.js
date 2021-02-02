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
import { nullLiteral } from '../../../../../../AppData/Local/Microsoft/TypeScript/4.1/node_modules/@babel/types/lib/index';

const GetSearch = ({ setDisc, setStem ,subclass, stem, part, setSeat, setRating, setType, setPart, setSubclass, setVisible, visible }) => {
  console.log('!!!!!!!!!!!!!!!!!!!', part);
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
  }));
  //리스트
  const [data, setData] = useState();
  const [minorcd, setMinorcd] = useState();
  // const [remark, setRemark] = useState();
  const subClass = useRef(null);
  const parts = useRef(null);
  const type = useRef(null);
  const rating = useRef(null);
  const seats = useRef(null);

  ///////////////////////////////////////
  const steams = useRef(null);
  const discs = useRef(null);
  const specials = useRef(null);
  const bores = useRef(null);
  const ends = useRef(null);
  const bodys = useRef(null);
  ///////////////////////////////////////

  //취소버튼 클릭 시
  const onCancel = () => {
    setVisible(false);
    subClass.current = null;
    // setSubclass('');
  };

  //첫 테이블 뿌리는거
  const fCount = async () => {
    try {
      console.log('파트써렌트', parts.current);
      console.log('썹클래스써렌트', subClass.current);

      if(steams.current !== null){
        let result = await axios.get('/@/test/select1_1', {
          params: { Minor: '503', Item1: '061001', Item2: subclass.Item2, Minornm: '%' },
        });
        provider.current.setRows(result.data);
        discs.current = result.data;
      }
      else if (seats.current !== null) {
        console.log('지금여기', subclass);
        console.log('왜 들어오노');
        let result = await axios.get('/@/test/select1_1', {
          params: { Minor: '502', Item1: '061001', Item2: subclass.Item2, Minornm: '%' },
        });
        provider.current.setRows(result.data);
        steams.current = result.data;
      } else if (part === 'BD') {
        let result = await axios.get('/@/test/select1', {
          params: { Minor: '501', Item1: '061001', Minornm: '%' },
        });
        provider.current.setRows(result.data);
        seats.current = result.data;
      } else if (subClass.current === null && parts.current === null) {
        let result = await axios.get('/@/test/select1', {
          params: { Minor: '062', Item1: '061001', Minornm: '%' },
        });
        provider.current.setRows(result.data);
        subClass.current = result.data;
      } else if (subClass.current !== null && parts.current === null) {
        let result2 = await axios.get('/@/test/select1', {
          params: { Minor: '499', Item1: minorcd, Minornm: '%' },
        });
        provider.current.setRows(result2.data);
        parts.current = result2.data;
        setWrite('%');
        // setData(result.data)
        console.log(1111, parts.current);
      } else if (parts.current !== null) {
        if (type.current === null) {
          let result3 = await axios.get('/@/test/select1', {
            params: { Minor: '498', Item1: minorcd, Minornm: '%' },
          });
          provider.current.setRows(result3.data);
          type.current = result3.data;
          setWrite('%');
        } else {
          let result4 = await axios.get('/@/test/select1', {
            params: { Minor: '505', Item1: ' ', Minornm: '%' },
          });
          provider.current.setRows(result4.data);
          rating.current = result4.data;
          console.log(rating.current);
        }

        // setData(result.data)
        console.log(1111, type.current);
      }
    } catch (error) {
      console.log(1, error);
    }
  };

  const bdCount = async () => {
    try {
      if (part === 'BD') {
        let result = await axios.get('/@/test/select1', {
          params: { Minor: '501', Item1: '061001', Minornm: '%' },
        });
        provider.current.setRows(result.data);
        seats.current = result.data;
      }
    } catch (error) {
      console.log(1, error);
    }
  };

  //확인버튼 클릭 시
  const onConfirm = () => {
    console.log('확인시 썹클래스', subClass.current);
    console.log('확인시 파트', parts.current);
    console.log('확인시 타입', type.current);
    if(discs.current !== null){
      console.log('여기 들간다222');
      setDisc(data);
      setVisible(false);
    }
    else if( steams.current !== null){
      console.log('여기 들간다111');
      setStem(data);
      setVisible(false);
    }
    else if (part === 'BD') {
      console.log('여기 들간다111');
      setSeat(data);
      setVisible(false);
    } else if (subClass.current !== null && parts.current === null && type.current === null && rating.current === null) {
      console.log('여기 들간다');
      setSubclass(data);
      setVisible(false);
    } else if (parts.current !== null && type.current === null && rating.current === null) {
      console.log('여기도 들간다');
      setPart(data);
      setVisible(false);
    } else if (type.current !== null && rating.current === null) {
      console.log('여기도 들간다2');
      setType(data);
      setVisible(false);
    } else if (rating.current !== null) {
      console.log('여기도 들간다3');
      setRating(data);
      setVisible(false);
      console.log('마무리까진 됨');
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

  //조회버튼
  const fCount2 = async () => {
    // try {
    //   console.log('값잇나?', subClass.current);
    //   // console.log('클릭한 데이터의 리마크',data.Remark)
    //   if (parts.current === null) {
    //     let result1 = await axios.get('/@/test/select1', {
    //       params: { Minor: '062', Item1: '061001', Minornm: write.search },
    //     });
    //     provider.current.setRows(result1.data);
    //     console.log('여기');
    //   } else if (subClass.current !== null) {
    //     console.log('보자보자');
    //     console.log('이전 클릭한 데이터', data);
    //     let result2 = await axios.get('/@/test/select1', {
    //       params: { Minor: '499', Item1: data.Minorcd, Minornm: write.search },
    //     });
    //     console.log(2, result2.data);
    //     provider.current.setRows(result2.data);
    //     console.log('여기2');
    //   }
    //   setWrite('%');
    // } catch (error) {
    //   console.log(1, error);
    // }
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
      fCount();
      // bdCount();
      // fCount2();
    }
  }, [visible]);
  function registerCallback() {
    gridView.current.onCellClicked = function (grid, clickData) {
      console.log('클릭시 데이터', gridView.current.getValues(clickData.itemIndex));
      setData(gridView.current.getValues(clickData.itemIndex));
      setMinorcd(gridView.current.getValues(clickData.itemIndex).Minorcd);
      // setRemark(gridView.current.getValues(clickData.itemIndex).Remark);
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
                      fCount2();
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

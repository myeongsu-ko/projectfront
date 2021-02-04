import React, { useEffect, useRef } from 'react';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { Box, Button } from '@material-ui/core';
import imgLogo from '@assets/images/img_eng_mark.png';
import { GridView, LocalDataProvider, ValueType } from 'realgrid';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const FinalSelect = ({ testArr2, visible4, setVisible4 }) => {
  const { commonStore } = useStores();
  const { $Dim } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $setAlert: commonStore.fSetAlert,
  }));

  const onCancel = () => {
    setVisible4(false);
    // setSubclass('');
  };
  let provider = useRef(null);
  let gridView = useRef(null);

  const fCount = async () => {
    try {
      let result = await axios.get('/@/test/finalSelect', {
        params: {
          subclass: testArr2.subclass !== null ? testArr2.subclass.Minorcd : '',
          stgrade: testArr2.stgrade !== null ? testArr2.stgrade.Minorcd : '',
          part: testArr2.part !== null ? testArr2.part.Minorcd : '',
          type: testArr2.type !== null ? testArr2.type.Minorcd : '',
          seat: testArr2.seat !== null ? testArr2.seat.Minorcd : '',
          stem: testArr2.stem !== null ? testArr2.stem.Minorcd : '',
          disc: testArr2.disc !== null ? testArr2.disc.Minorcd : '',
          special: testArr2.special !== null ? testArr2.special.Minorcd : '',
          rating: testArr2.rating !== null ? testArr2.rating.Minorcd : '',
          bore: testArr2.bore !== null ? testArr2.bore.Minorcd : '',
          size: testArr2.size !== null ? testArr2.size.Minorcd : '',
          end: testArr2.end !== null ? testArr2.end.Minorcd : '',
          body: testArr2.body !== null ? testArr2.body.Minorcd : '',
        },
      });
      provider.current.setRows(result.data);
    } catch (error) {
      console.log(1, error);
    }
  };

  useEffect(() => {
    if (visible4) {
      provider.current = new LocalDataProvider();
      gridView.current = new GridView('realgrid');
      gridView.current.setDataSource(provider.current);
      provider.current.setFields(fields);
      gridView.current.setColumns(columns);
      const height = gridView.current.displayOptions.rowHeight;
      gridView.current.displayOptions.rowHeight = height + 70;
      gridView.current.displayOptions.selectionStyle = 'rows';
      gridView.current.columnByName('goodno').editable = false;
      gridView.current.setRowIndicator({
        visible: false,
      });
      gridView.current.setCheckBar({
        visible: false,
      });
      gridView.current.setStateBar({
        visible: false,
      });
      fCount();
    }
  }, [visible4]);

  if (!visible4) return null;
  return (
    <>
      <Box style={{ position: 'fixed', zIndex: 2000, top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.25)' }} display="flex" justifyContent="center" alignItems="center">
        <Box style={{ height: $Dim * 200, width: $Dim * 250, background: '#fff', borderRadius: '4px', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.125)' }}>
          <Box style={{ background: '#e6e6e6', padding: $Dim * 5, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} display="flex">
            <img src={imgLogo} alt="logo" style={{ width: $Dim * 40 }} />
          </Box>
          <Box style={{ padding: $Dim * 8 }}>
            <Box style={{ marginTop: $Dim * 10, marginBottom: $Dim * 5 }}>
              <Box style={{ height: $Dim * 100, fontSize: $Dim * 10, fontWeight: 'bold', justifyContent: 'center' }}>
                <Box display="flex" justifyContent="center" style={{ marginTop: -10, marginBottom: 5 }}>
                  <Typography variant="h4">품번확인</Typography>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <div id="realgrid" style={{ width: '435px', height: '150px' }} />
                </Box>
              </Box>
            </Box>{' '}
            {/* 내용부분 */}
            <Box display="flex" justifyContent="center" style={{ marginTop: 40 }}>
              <Button variant="contained" style={{ width: $Dim * 100, height: $Dim * 30, backgroundColor: 'red', fontSize: $Dim * 10, color: '#ffffff' }} onClick={onCancel}>
                닫기
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
    fieldName: 'goodno',
    dataType: ValueType.TEXT,
  },
];

const columns = [
  {
    name: 'goodno',
    fieldName: 'goodno',
    type: 'data',
    width: '435',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '품번확인',
      showTooltip: false,
    },
    numberFormat: '0',
  },
];

export default FinalSelect;

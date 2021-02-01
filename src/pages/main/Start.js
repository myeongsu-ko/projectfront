import React, { useRef, useState, useEffect } from 'react';
import { Box, Button } from '@material-ui/core'; //Button
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import { TreeView, LocalTreeDataProvider } from 'realgrid';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { columns, fields } from './realgrid-data';

const Start = () => {
  const [click, setClick] = useState(null);
  const [deleteValue, setDeleteValue] = useState();
  const { commonStore } = useStores();
  const { $Dim, $setAlert, $Confirm, $setConfirm, $setConfirmFunc } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $setAlert: commonStore.fSetAlert,
    $Confirm: commonStore.Confirm,
    $setConfirm: commonStore.fSetConfirm,
    $setConfirmFunc: commonStore.fSetConfirmFunc,
  }));

  // const [format,setFormat]= useState(false);

  const [write, setWrite] = useState({
    Minornm: '',
    Remark: '',
    Item1: '',
    Item2: '',
    Item3: '',
    Item4: '',
    UseYn: '',
  });
  const [write1, setWrite1] = useState({
    Minor: '',
    Minorcd: '',
    Minornm: '',
    Remark: '',
    Item1: '',
    Item2: '',
    Item3: '',
    Item4: '',
    UseYn: '',
  });
  // console.log('보자보자',write1)
  const inputHandle1 = (e) => {
    setDeleteButton(false);
    setWrite1({
      ...write1,
      [e.target.name]: e.target.value,
    });
  };
  //추가항목 버튼
  const inputHandle = (e) => {
    setWrite({
      ...write,
      [e.target.name]: e.target.value,
    });
  };
  const [update, setUpdate] = useState([]);
  const Styles = fStyles($Dim);
  const [modify, setModify] = useState(false);
  const modifyHandle = () => {
    setDateAdd(false);
    setModify(!modify);
    setDeleteButton(false);
    setSelectOne(false);
  };

  const [selectOne, setSelectOne] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [minorAdd, setMinorAdd] = useState(0);
  const [dateAdd, setDateAdd] = useState(false);

  //코드추가 버튼
  const addHandle = () => {
    let focusCell = treeView.current.getCurrent();
    if (treeView.current.getValues(focusCell.itemIndex) === null) {
      $setAlert({ visible: true, desc: '그리드에서 행을 선택하십시오' });
    } else {
      setModify(false);
      setDateAdd(!dateAdd);
      setSelectOne(false);
      setDeleteButton(false);
      const rowIds = treeProvider.current.getChildren(focusCell.dataRow);
      if (rowIds !== null) {
        //부모행을 선택했을떄
        setUpdate(treeProvider.current.getValues(rowIds[rowIds.length - 1]));
      } else {
        //자식행을 선택했을때
        const parentId = treeProvider.current.getAncestors(focusCell.dataRow);
        const rowIds = treeProvider.current.getChildren(parentId);
        setUpdate(treeProvider.current.getValues(rowIds[rowIds.length - 1]));
      }
    }
  };

  //리스트
  const fCount = async () => {
    try {
      let result = await axios.get('/@/test/aaa');
      treeProvider.current.setRows(result.data, 'Minorcd', false, null, '');
      treeView.current.expandAll();
      setMinorAdd(parseInt(result.data[result.data.length - 1][2]) + 1);
    } catch (error) {
      if (error.response.status === 404) {
        $setAlert({ visible: true, desc: '해당 코드가 없습니다.' });
      } else {
        $setAlert({ visible: true, desc: '조회중 오류가 발생하였습니다.' });
      }
    }
  };

  const fConfirm = () => {
    if (modify === false && dateAdd === false) {
      $setConfirm({
        visible: true,
        desc: '정말 수정하시겠습니까?',
        id: 'save',
      });
    } else {
      $setConfirm({
        visible: true,
        desc: '정말 저장 하시겠습니까?',
        id: 'save',
      });
    }
  };

  const fConfirmdtn = () => {
    $setConfirm({
      visible: true,
      desc: '정말 삭제하시겠습니까?',
      id: 'delete',
    });
  };

  const fConfirmFunc = async () => {
    $setConfirmFunc(async () => {
      $setConfirm({ visible: false, desc: '', id: '' });
      if ($Confirm.id === 'delete') {
        const focusCell = treeView.current.getCurrent();
        const value = treeView.current.getValues(focusCell.itemIndex);
        setDeleteValue(value);
        console.log(deleteValue);
        await axios.post('/@/test/delete', {
          data: write1,
        });
      }

      if ($Confirm.id === 'save') {
        console.log('이곳');
        try {
          if (modify !== false) {
            await axios.post('/@/test/register', {
              data: { ...write, Minor: minorAdd + '', Minorcd: minorAdd + '001' },
            });
          } else if (dateAdd !== false) {
            await axios.post('/@/test/register', {
              data: {
                ...write,
                Minor: update[2] + '',
                Minorcd:
                  (parseInt(update[0].slice(3)) + 1) / 100 >= 1
                    ? update[2] + (parseInt(update[0].slice(3)) + 1) + ''
                    : (parseInt(update[0].slice(3)) + 1) / 10 >= 1
                    ? update[2] + '0' + (parseInt(update[0].slice(3)) + 1) + ''
                    : update[2] + '00' + (parseInt(update[0].slice(3)) + 1) + '',
              },
            });
          } else {
            //수정넣기
            await axios.post('/@/test/update', {
              data: { write1 },
            });
          }
        } catch (error) {
          if (error.response.status === 404) {
            $setAlert({ visible: true, desc: '해당 코드가 없습니다.' });
          } else {
            $setAlert({ visible: true, desc: '조회중 오류가 발생하였습니다.' });
          }
        }
      }
    });
  };

  let treeProvider = useRef(null);
  let treeView = useRef(null);

  useEffect(() => {
    treeView.current === null && (treeProvider.current = new LocalTreeDataProvider());
    treeView.current === null && (treeView.current = new TreeView('realgrid'));
    treeView.current.setDataSource(treeProvider.current);
    treeProvider.current.setFields(fields);
    treeView.current.setColumns(columns);
    //로우 전체 선택
    treeView.current.displayOptions.selectionStyle = 'rows';
    // setFormat(false);
    treeView.current.setRowStyleCallback(function (grid, item) {
      var Minorcd = grid.getValue(item.index, 'Minorcd');
      if (Minorcd.length === 3) {
        return 'yellow-color';
      }
    });

    treeView.current.columnByName('Minor').editable = false;
    treeView.current.columnByName('Minorcd').editable = false;
    treeView.current.columnByName('Minornm').editable = false;
    treeView.current.columnByName('Item1').editable = false;
    treeView.current.columnByName('Item2').editable = false;
    treeView.current.columnByName('Item3').editable = false;
    treeView.current.columnByName('Item4').editable = false;
    treeView.current.columnByName('UseYn').editable = false;
    treeView.current.columnByName('Remark').editable = false;
    treeView.current.columnByName('CNT').editable = false;
    treeView.current.setCheckBar({
      visible: false,
    });
    treeView.current.setEditOptions({
      insertable: true,
      appendable: true,
      updatable: true,
      deletable: true, //CRUD 하기 위한 작업들
      softDeleting: true,
    });
    treeView.current.cancel(); //수정하고 저장할때 오류를 막기 위함
    fCount();

    // let focusCell = treeView.current.getCurrent();
    // let aaa = treeView.current.getValues(focusCell.itemIndex);
    // console.log(1,aaa)
    registerCallback();
    fConfirmFunc();
  }, [$Confirm]);

  function registerCallback() {
    treeView.current.onCellClicked = function (grid, clickData) {
      if (treeView.current.getValues(clickData.itemIndex).Minornm !== '') {
        setSelectOne(true);
        setClick(treeView.current.getValues(clickData.itemIndex));
        setModify(false);
        setDateAdd(false);
        setSelectOne(false);
        setSelectOne(true);
        setDeleteButton(true);
        setWrite1({
          ...write1,
          Minor: treeView.current.getValues(clickData.itemIndex).Minor,
          Minorcd: treeView.current.getValues(clickData.itemIndex).Minorcd,
          Minornm: treeView.current.getValues(clickData.itemIndex).Minornm,
          Remark: treeView.current.getValues(clickData.itemIndex).Remark,
          Item1: treeView.current.getValues(clickData.itemIndex).Item1,
          Item2: treeView.current.getValues(clickData.itemIndex).Item2,
          Item3: treeView.current.getValues(clickData.itemIndex).Item3,
          Item4: treeView.current.getValues(clickData.itemIndex).Item4,
          UseYn: treeView.current.getValues(clickData.itemIndex).UseYn,
        });
      } else {
        setDeleteButton(false);
      }
    };
  }

  return (
    <>
      <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
        <Box style={{ width: $Dim * 500, height: $Dim * 200, marginTop: $Dim * 20 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <div id="realgrid" style={Styles.s2} />
        </Box>

        <Box style={{ width: $Dim * 700, height: $Dim * 200, backgroundColor: 'skyblue', marginTop: $Dim * 70 }} justifyContent="space-between">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Button variant="contained" onClick={modifyHandle} style={{ marginRight: $Dim * 5 }}>
                신규항목
              </Button>
              <Button variant="contained" onClick={addHandle}>
                코드추가
              </Button>
            </div>
            <div>
              {deleteButton && (
                <Button variant="contained" style={{ marginRight: $Dim * 5 }} onClick={fConfirmdtn} color="secondary">
                  삭제
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={fConfirm}>
                저장
              </Button>
            </div>
          </div>
          <Box style={{ width: $Dim * 680, height: $Dim * 160, backgroundColor: 'white', marginLeft: $Dim * 10, marginTop: $Dim * 10 }} justifyContent="space-between">
            {modify && <TextField disabled label="MinorCd" name="Minorcd" defaultValue={minorAdd + '001'} variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Minornm" name="Minornm" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField disabled label="Minor" name="Minor" defaultValue={minorAdd} variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Remark" name="Remark" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Item1" name="Item1" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Item2" name="Item2" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Item3" name="Item3" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="Item4" name="Item4" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {modify && <TextField label="UseYn" name="UseYn" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}

            {/* 코드추가 */}
            {dateAdd && (
              <TextField
                disabled
                label="MinorCd"
                name="Minorcd"
                defaultValue={
                  (parseInt(update[0].slice(3)) + 1) / 100 >= 1
                    ? update[2] + (parseInt(update[0].slice(3)) + 1) + ''
                    : (parseInt(update[0].slice(3)) + 1) / 10 >= 1
                    ? update[2] + '0' + (parseInt(update[0].slice(3)) + 1) + ''
                    : update[2] + '00' + (parseInt(update[0].slice(3)) + 1) + ''
                }
                variant="filled"
                size="small"
              />
            )}
            {dateAdd && <TextField label="Minornm" name="Minornm" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField disabled label="Minor" name="Minor" defaultValue={update[2]} variant="filled" size="small" />}
            {dateAdd && <TextField label="Remark" name="Remark" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField label="Item1" name="Item1" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField label="Item2" name="Item2" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField label="Item3" name="Item3" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField label="Item4" name="Item4" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}
            {dateAdd && <TextField label="UseYn" name="UseYn" defaultValue="" variant="filled" size="small" onChange={inputHandle} />}

            {selectOne && <TextField label="MinorCd" name="Minorcd" defaultValue={click !== null ? click.Minorcd : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Minor" name="Minor" defaultValue={click !== null ? click.Minor : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Minornm" name="Minornm" defaultValue={click !== null ? click.Minornm : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Remark" name="Remark" defaultValue={click !== null ? click.Remark : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Item1" name="Item1" defaultValue={click !== null ? click.Item1 : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Item2" name="Item2" defaultValue={click !== null ? click.Item2 : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Item3" name="Item3" defaultValue={click !== null ? click.Item3 : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="Item4" name="Item4" defaultValue={click !== null ? click.Item4 : ''} variant="filled" size="small" onChange={inputHandle1} />}
            {selectOne && <TextField label="UseYn" name="UseYn" defaultValue={click !== null ? click.UseYn : ''} variant="filled" size="small" onChange={inputHandle1} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const fStyles = ($Dim) => {
  return {
    s1: { width: $Dim * 1000, height: $Dim * 550, background: '#fff' },
    s2: { width: $Dim * 490, height: $Dim * 250, marginBottom: $Dim * 150, marginTop: $Dim * 220 },
  };
};

export default withRouter(Start);

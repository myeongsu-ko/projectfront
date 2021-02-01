/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
import { Box,Button } from '@material-ui/core'; //Button
import useStores from '@stores/useStores';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import GetSearch from 'pages/popups/GetSearch';
import GetSearch2 from 'pages/popups/GetSearch2';
// import axios from 'axios';

const Lookup = () => {
  const [showView, setShowView] = useState(false);
  const [showView2, setShowView2] = useState(false);
  const [showView3, setShowView3] = useState(false);
  const [showView4, setShowView4] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const { commonStore } = useStores();
    const [subclass, setSubclass] = useState(null);
    const [part, setPart] = useState(null);
    const [type, setType] = useState(null);
    const {$Dim} = useObserver(() => ({
        $Dim: commonStore.Dim,
        $Confirm: commonStore.Confirm,
        $setConfirm: commonStore.fSetConfirm,
        $setConfirmFunc: commonStore.fSetConfirmFunc,
      }));
      const Styles = fStyles($Dim);
      useEffect(()=>{
      },[visible])
    return (
      <>
        
        <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
          <Box style={{height: $Dim * 30 }} />
          <Box style={{ width: $Dim * 500, height: $Dim * 20, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{display:'flex', justifyContent:'space-around'}}>
              <Button variant="contained" style={{marginRight:$Dim * 5}}>초기화</Button>
              <Button variant="contained" style={{marginRight:$Dim * 5}}>품번확인</Button>
            </Box>
          </Box>
        
          <Box style={{ width: $Dim * 500, height: $Dim * 200, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{fontSize:$Dim*10, alignItems:"center"}}>
              
              <div>소분류 :</div>
              <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                <InputLabel disabled htmlFor="outlined-adornment-amount">{subclass}</InputLabel>
                <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
              </FormControl>

              {subclass !== null && 
              <div>
                <div>반제품 PART :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{part}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}

              {part !== null && 
              <div>
                <div>반제품 TYPE :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{type}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}
              {showView4 && 
              <div>
                <div>강종 :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount" />
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}
              {showView3 && 
              <div>
                <div>SEAT :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount" />
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                <div>BD-BT & STEM :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount" />
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                <div>DISC :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount" />
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                <div>SPECIAL CLASS :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount" />
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}


            </Box>
          </Box> 
        </Box>

        <GetSearch showView4={showView4} setShowView4={setShowView4} setType={setType} showView3={showView3} setShowView3={setShowView3} showView2={showView2} setShowView2={setShowView2} showView={showView} setShowView={setShowView} setSubclass={setSubclass} setPart={setPart} visible={visible} setVisible={setVisible} />
        <GetSearch2 visible={visible2} setVisible={setVisible2} />
      </>
    );
};

const fStyles = ($Dim) => {
    return {
      s1: { width: $Dim * 1000, height: $Dim * 550, background: '#fff' },
      s2: { width: $Dim * 450, height: $Dim * 250,marginBottom: $Dim * 150, marginTop: $Dim * 220},
    };
  };

export default withRouter(Lookup);
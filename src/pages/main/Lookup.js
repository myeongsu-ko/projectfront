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
import GetSearch3 from 'pages/popups/GetSearch3';
// import axios from 'axios';

const Lookup = () => {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const { commonStore } = useStores();
    const [subclass, setSubclass] = useState(null);
    const [part, setPart] = useState(null);
    const [type, setType] = useState(null);
    const [rating, setRating] = useState(null);
    const [size, setSize] = useState(null);
    const [seat, setSeat] = useState(null);
    const [stem, setStem] = useState(null);
    const [bore, setBore] = useState(null);
    const [stgrade, setStgrade] = useState(null);
    const [disc, setDisc] = useState(null);
    const [special, setSpecial] = useState(null);

    const {$Dim} = useObserver(() => ({
        $Dim: commonStore.Dim,
        $Confirm: commonStore.Confirm,
        $setConfirm: commonStore.fSetConfirm,
        $setConfirmFunc: commonStore.fSetConfirmFunc,
      }));
      const Styles = fStyles($Dim);
      // useEffect(()=>{
      // },[visible])
      console.log(part);
      const aaa = () =>{
        console.log(1,subclass)
        console.log(2,part)
        console.log(3,type)
        console.log(4,rating)
        console.log(5,size)
        console.log(6,stgrade)
      }
    return (
      <>
        
        <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
          <Box style={{height: $Dim * 30 }} />
          <Box style={{ width: $Dim * 500, height: $Dim * 20, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{display:'flex', justifyContent:'space-around'}}>
              <Button variant="contained" style={{marginRight:$Dim * 5}} onClick={aaa}>초기화</Button>
              <Button variant="contained" style={{marginRight:$Dim * 5}}>품번확인</Button>
            </Box>
          </Box>
        
          <Box style={{ width: $Dim * 500, height: $Dim * 200, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{fontSize:$Dim*10, alignItems:"center"}}>
              
              <div>소분류 :</div>
              <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                <InputLabel disabled htmlFor="outlined-adornment-amount">{subclass !== null && subclass.Minornm}</InputLabel>
                <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
              </FormControl>

              {subclass !== null && 
              <div>
                <div>반제품 PART :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{part !== null && part.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}
              
              {part !== null ? part.Remark !== 'BD' &&
              <div>
                <div>반제품 TYPE :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{type !== null && type.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>SEAT :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{seat !== null && seat.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>BD-BT & STEM :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{stem !== null && stem.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>DISC :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{disc !== null && disc.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>SPECIAL CLASS :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{special !== null && special.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null &&
              <div>
                <div>RATING CLASS :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{rating !== null && rating.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>BORE :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{bore !== null && bore.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null &&
              <div>
                <div>SIZE :</div>
                <FormControl onClick={()=>setVisible2(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{size}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>END :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{seat !== null && seat.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div>
                <div>BODY MATERIAL :</div>
                <FormControl onClick={()=>setVisible(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{seat !== null && seat.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div> : null}
              {part !== null ? part.Remark !== 'BD' &&
              <div>
                <div>강종 :</div>
                <FormControl onClick={()=>setVisible3(true)} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{stgrade}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
              </div>:null}
            </Box>
          </Box> 
        </Box>

        <GetSearch setDisc={setDisc} setStem={setStem} subclass={subclass} stem={stem} part={part!==null ? part.Remark:''} setSeat={setSeat} setRating={setRating} subclass={subclass} setType={setType} setSubclass={setSubclass} setPart={setPart} visible={visible} setVisible={setVisible} />
        <GetSearch2 bore={bore} rating={rating} setSize={setSize} visible2={visible2} setVisible2={setVisible2} />
        <GetSearch3 size={size} visible3={visible3} setVisible3={setVisible3} setStgrade={setStgrade}/>
      </>
    );
};

const fStyles = ($Dim) => {
    return {
      s1: { width: $Dim * 1000, height: $Dim * 700, background: '#fff' },
      s2: { width: $Dim * 450, height: $Dim * 250,marginBottom: $Dim * 150, marginTop: $Dim * 220},
    };
  };

export default withRouter(Lookup);
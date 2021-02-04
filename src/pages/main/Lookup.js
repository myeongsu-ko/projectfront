/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-duplicates
import { Box,Button } from '@material-ui/core'; //Button
import useStores from '@stores/useStores';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import GetSearch from 'pages/popups/GetSearch';
import GetSearch2 from 'pages/popups/GetSearch2';
import GetSearch3 from 'pages/popups/GetSearch3';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// eslint-disable-next-line import/no-duplicates
import { IconButton } from '@material-ui/core';
import FinalSelect from 'pages/popups/FinalSelect';
import { map } from 'jquery';
// import axios from 'axios';



const Lookup = () => {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
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
    const [end, setEnd] = useState(null);
    const [body, setBody] = useState(null);

    const testArr ={
      setSubclass:setSubclass,
      setPart: setPart,
      setType: setType,
      setRating: setRating,
      setSize: setSize,
      setSeat: setSeat,
      setStem: setStem,
      setBore: setBore,
      setStgrade: setStgrade,
      setDisc: setDisc,
      setSpecial: setSpecial,
      setBody: setBody,
      setEnd: setEnd,
    }

    const list = [subclass,part,type,rating,size,seat,stem,bore,stgrade,disc,special,end]
    const list2 = [subclass,part,type,rating,size,stgrade,end]
    const testArr2 = {
      body:body,
      subclass: subclass,
      part: part,
      type: type,
      rating: rating,
      size: size,
      seat: seat,
      stem: stem,
      bore: bore,
      stgrade: stgrade,
      disc: disc,
      special: special,
      end: end,
    }
    const {$Dim, $setAlert} = useObserver(() => ({
        $Dim: commonStore.Dim,
        $Confirm: commonStore.Confirm,
        $setConfirm: commonStore.fSetConfirm,
        $setConfirmFunc: commonStore.fSetConfirmFunc,
        $setAlert: commonStore.fSetAlert,
      }));

      const fAlert = () => {
        $setAlert({ visible: true, desc: '데이터가 부족합니다.' });
        return;
      };

      const finalBtn =() =>{
        // list.map((arr)=>{
        //   if(arr === null){
        //     fAlert();
        //   }
        //   setVisible4(true)
        // })
        
        if(stgrade !== null || body!== null){
          setVisible4(true)
        }else{
          fAlert();
        }
      }
      const Styles = fStyles($Dim);

//초기화
      const onReset = () =>{
        setSubclass(null);
        setPart(null);
        setType(null);
        setRating(null);
        setSize(null);
        setSeat(null);
        setStem(null);
        setBore(null);
        setStgrade(null);
        setDisc(null);
        setSpecial(null);
        setEnd(null);
        setBody(null);
        // HandleShow();
      }

      useEffect(()=>{
        onReset()
      },[])

     
    return (
      <>
        
        <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
          <Box style={{height: $Dim * 30 }} />
          <Box style={{ width: $Dim * 550, height: $Dim * 20, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{display:'flex', justifyContent:'space-around'}}>
              <Button variant="contained" style={{backgroundColor: 'red',marginRight:$Dim * 5 ,color: '#ffffff'}} onClick={onReset}>초기화</Button>
              <Button variant="contained" style={{backgroundColor: '#348fe2',marginRight:$Dim * 5,color: '#ffffff'}} onClick={finalBtn}>품번확인</Button>
            </Box>
          </Box>
        
          <Box style={{ width: $Dim * 550, height: $Dim * 200, marginTop: $Dim * 20  }} display="flex" flexDirection="column" alignItems="center">
            <Box style={{fontSize:$Dim*10, alignItems:"center"}}>
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>소분류 :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '062', Item1:'061001'})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel htmlFor="outlined-adornment-amount">{subclass !== null && subclass.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                {subclass &&<IconButton onClick={()=>{setSubclass(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div>
              {subclass !== null && 
              <div style={{display: 'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>반제품 PART :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '499', Item1: subclass.Minorcd})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel htmlFor="outlined-adornment-amount">{part !== null && part.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                {part && <IconButton onClick={()=>{setPart(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div>}
              
              {part !== null ? part.Remark !== 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>반제품 TYPE :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '498', Item1: part.Minorcd})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{type !== null && type.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { type && <IconButton onClick={()=>{setType(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>SEAT :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '501', Item1: '061001'})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{seat !== null && seat.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { seat && <IconButton onClick={()=>{setSeat(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>BD-BT & STEM :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '502', Item1: '061001', Item2: subclass.Item2})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{stem !== null && stem.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { stem &&<IconButton onClick={()=>{setStem(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>DISC :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '503', Item1: '061001', Item2: subclass.Item2})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{disc !== null && disc.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { disc && <IconButton onClick={()=>{setDisc(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>SPECIAL CLASS :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '504', Item1: ' '})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{special !== null && special.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { special && <IconButton onClick={()=>{setSpecial(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>RATING CLASS :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '505', Item1: ' '})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{rating !== null && rating.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { rating && <IconButton onClick={()=>{setRating(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div>}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>BORE :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '506', Item1: ' '})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{bore !== null && bore.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { bore && <IconButton onClick={()=>{setBore(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>SIZE :</div>
                <FormControl disabled onClick={()=>{setVisible2({visble2: true, Minor: '507'})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{size !== null ?size.Minornm:null}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { size && <IconButton onClick={()=>{setSize(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div>}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>END :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '508', Item1: ' '})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{end !== null && end.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { end && <IconButton onClick={()=>{setSize(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark === 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>BODY MATERIAL :</div>
                <FormControl disabled onClick={()=>{setVisible({visble: true, Minor: '063', Item1: 'BODY'})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{body !== null && body.Minornm}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { body &&<IconButton onClick={()=>{setBody(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div> : null}
              {part !== null ? part.Remark !== 'BD' &&
              <div style={{display:'flex', marginBottom:15}}>
                <div style={{marginTop:15,marginRight:10}}>강종 :</div>
                <FormControl disabled onClick={()=>{setVisible3({visble: true})}} fullWidth variant="outlined" style={{width:$Dim*400}}>
                  <InputLabel disabled htmlFor="outlined-adornment-amount">{stgrade !== null ? stgrade.Minornm:null}</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" labelWidth={60} />
                </FormControl>
                { stgrade && <IconButton onClick={()=>{setStgrade(null)}}><HighlightOffIcon fontSize='large' /></IconButton>}
              </div>:null}
            </Box>
          </Box> 
        </Box>

        {/* {
          setAaa({
            size: '100',
            setDics(),
            aaa: '100',
            
          })
        } */}
        <GetSearch testArr={testArr} visible={visible} setVisible={setVisible} />
        <GetSearch2 bore={bore} setSize={setSize} visible2={visible2} setVisible2={setVisible2} />
        <GetSearch3 size={size} visible3={visible3} setVisible3={setVisible3} setStgrade={setStgrade} />
        <FinalSelect testArr2={testArr2} visible4={visible4} setVisible4={setVisible4} />
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

// const clickHandle = () =>{

//   if(visible.Minor){

//   }

//   if (body !== null) {

//     setBody(null);
//   } 
//   else if (end !== null) {
//     setEnd(null);
//   } 
//   else if (stgrade === null && size !== null) {
//     setSize(null);

//   }
//   else if (bore !== null) {
//     setBore(null);
//   } 
//   else if (stgrade === null && rating !== null) {
//     setRating(null);

//   }
//   else if (special !== null) {
//     setSpecial(null);
//   } else if (disc !== null) {
//     setDisc(null);
//   } else if (stem !== null) {
//     setStem(null);
//   } else if (seat !== null) {
//     setSeat(null);
//   } else if (stgrade !== null) {
//     setStgrade(null);
//   }
//     else if (size !== null) {
//     setSize(null);
//   } else if (rating !== null) {
//     setRating(null);
   
//   } else if (type !== null) {
//     setType(null);
//   } else if (part !== null) {
//     setPart(null);
 
//   } else if (subclass !== null) {
//     setSubclass(null);
//   }
// }
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import useStores from '@stores/useStores';
import { useObserver } from 'mobx-react-lite';
import SecStorage from '@lib/secureStorage';
import BrowserDetection from 'react-browser-detection';
import { useCookies } from 'react-cookie';
import { Box, Grow } from '@material-ui/core';
import { TiInfoOutline } from 'react-icons/ti';
import { FaLock } from 'react-icons/fa';
import imgLogo from '@assets/images/img_eng_logo.png';

const Login = ({ history }) => {
  const { commonStore, userStore } = useStores();
  const { $Dim, $user, $setUser, $storekey } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $user: userStore.user,
    $setUser: userStore.fSetUser,
    $storekey: userStore.storekey,
  }));

  const Styles = fStyles($Dim);

  const [cookies, setCookie, removeCookie] = useCookies(['saveid_hansun']);
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [error, setError] = useState(null);

  const fChangeUserId = (e) => {
    setUserId(e.target.value);
  };

  const fChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const fSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!userid) {
      setError('아이디를 입력하세요.');
      return;
    } else if (!password) {
      setError('비밀번호를 입력하세요.');
      return;
    }

    const encpass = password;
    try {
      let result = await axios.get('/@/auth/encproc', {
        params: { userid: userid, password: encpass },
      });
      const rtnpass = result.data;
      let result2 = await axios.post('/@/auth/login', {
        userid: userid,
        password: rtnpass,
      });
      const data = result2.data;
      if (data.errmess) {
        setError(data.errmess);
      } else {
        $setUser(data);
      }
    } catch (error) {
      setError('로그인 요청중 오류가 발생하였습니다.');
    }
  };

  const fSaveIdClick = (e) => {
    setSaveId(e.target.checked);
  };

  useEffect(() => {
    if (cookies.saveid_hansun) {
      setSaveId(true);
      const id = cookies.saveid_hansun;
      setUserId(id);
      setPassword('');
    }
  }, [cookies]);

  useEffect(() => {
    if ($user && $user.userid) {
      if (saveId) {
        setCookie('saveid_hansun', $user.userid, { path: '/' });
      } else {
        removeCookie('saveid_hansun');
      }
      try {
        const secureStorage = SecStorage($storekey);
        secureStorage.setItem('user_hansun', JSON.stringify($user));
      } catch (e) {
        history.push('/error_500');
      }
      history.push('/');
    }
  }, [$user]);

  return (
    <>
      <BrowserDetection>{browserHandler}</BrowserDetection>
      <Box style={Styles.s1} display="flex" flexDirection="column" alignItems="center">
        <Box style={{ height: $Dim * 120 }} />
        <Box display="flex">
          <Box>
            <img src={imgLogo} alt="logo" style={{ width: $Dim * 150, height: $Dim * 20 }} />
          </Box>
          <Box style={{ marginLeft: $Dim * 15 }}>
            <FaLock style={{ width: $Dim * 20, height: $Dim * 20, color: '#c2c2c2' }} />
          </Box>
        </Box>
        <Box style={{ width: $Dim * 1000, height: $Dim * 190, background: '#2d353c', marginTop: $Dim * 10 }}>
          <form onSubmit={fSubmit}>
            <Box style={{ marginTop: $Dim * 15 }} display="flex" justifyContent="center">
              <input type="text" id="userid" name="userid" placeholder="아이디" value={userid} onChange={fChangeUserId} style={Styles.s2} />
            </Box>
            <Box style={{ marginTop: $Dim * 10 }} display="flex" justifyContent="center">
              <input type="password" id="password" name="password" placeholder="비밀번호" value={password} onChange={fChangePassword} style={Styles.s2} />
            </Box>
            <Box style={{ marginTop: $Dim * 10 }} display="flex" justifyContent="center">
              <Box style={{ width: $Dim * 170 }} display="flex" justifyContent="flex-start" alignItems="center">
                <input type="checkbox" id="saveId" checked={saveId} onChange={fSaveIdClick} style={{ width: $Dim * 15, height: $Dim * 15 }} />
                <label htmlFor="saveId" style={{ marginLeft: $Dim * 5, fontSize: $Dim * 12, color: '#c6ced5' }}>
                  아이디 저장
                </label>
              </Box>
            </Box>
            <Box style={{ marginTop: $Dim * 10 }} display="flex" justifyContent="center">
              <button
                type="submit"
                style={{ width: $Dim * 180, height: $Dim * 25, background: '#00acac', borderRadius: '6px', borderWidth: '0px', fontSize: $Dim * 12, fontWeight: 'bold', color: '#fff' }}
              >
                로그인
              </button>
            </Box>
            <Box style={{ marginTop: $Dim * 15, fontSize: $Dim * 12, color: '#ff2222' }} display="flex" justifyContent="center">
              &nbsp;
              {error}
              &nbsp;
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

const fStyles = ($Dim) => {
  return {
    s1: { width: $Dim * 1000, height: $Dim * 560, background: '#d9e0e7' },
    s2: {
      width: $Dim * 170,
      height: $Dim * 25,
      backgroundColor: '#4C5359',
      borderRadius: '6px',
      borderWidth: '0px',
      fontSize: $Dim * 13,
      fontWeight: 'bold',
      color: '#fff',
      paddingLeft: $Dim * 10,
    },
  };
};

const browserHandler = {
  default: (browser) => (
    <>
      {browser === 'ie' && (
        <Grow in={browser === 'ie'} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
          <Box border={1} borderRadius={5} p={1} borderColor="#ddd" bgcolor="#FFF1C0">
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Box width={50} height="100" display="flex" justifyContent="center" alignItems="center">
                <TiInfoOutline size="35" />
              </Box>
              <Box>
                <Box style={{ fontSize: '14px' }}>현재 사용 중인 브라우저는 지원이 중단 된 브라우저 입니다.</Box>
                <Box style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  보안에 위험이 없는
                  <a rel="noopener noreferrer" href="https://www.google.com/chrome/index.html?brand=CHNY&utm_campaign=en&utm_source=en-et-youtube&utm_medium=et" target="_blank">
                    {' '}
                    Chrome
                  </a>
                  <a rel="noopener noreferrer" href="https://www.microsoft.com/ko-kr/edge/" target="_blank">
                    {' '}
                    Edge
                  </a>
                  를 사용하여 주세요
                </Box>
              </Box>
            </Box>
          </Box>
        </Grow>
      )}
    </>
  ),
};

export default withRouter(Login);

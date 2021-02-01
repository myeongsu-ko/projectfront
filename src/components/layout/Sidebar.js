import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import useStores from '@stores/useStores';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

      },
      drawerPaperBlack: {
        width: drawerWidth,
        backgroundColor:'rgba(0, 0, 0)' //사이드바 배경(어두운)
      },
      drawerContainer: {
        overflow: 'auto',
        color:'white', //사이드바 글자 색깔
      },
      //드롭박스
      aaa:{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
      }
    }));


const Sidebar = () => {
  const { commonStore, userStore } = useStores();
  const { $Dim, $Title, $storekey, $clearUser } = useObserver(() => ({
    $Dim: commonStore.Dim,
    $Title: commonStore.Title,
    $storekey: userStore.storekey,
    $clearUser: userStore.fClearUser,
  }));

  const classes = useStyles();
  // const [change,setChange] = useState(classes.drawerPaperBlack); //사이드바 배경 변경 스테이트
  // const [layout, setLayout] = useState(false); //사이드바 static,light 열고 닫기기능
  // const [page, setPage] = useState(false); //사이드바 page 열고 닫기기능
  // const [authentication, setAuthentication] = useState(false); //사이드바 Authentication 열고닫기
  // const [error, setError] = useState(false); //사이드바 error 열고닫기
  
  
  // const layoutHandle = () => setLayout(!layout);
  // const pageHandle = () => {  
  //   setAuthentication(false); // 상위 사이드바 메뉴를 닫으면 다 닫히게 설정
  //   setError(false); 
  //     setPage(!page)
  // };
  // const authenticationHandle = () => setAuthentication(!authentication);
  // const errorHandle = () => setError(!error); 

    return (
        <>
         <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaperBlack,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              <p style={{fontSize:'15px',marginLeft:20}}>1/20지시</p>
              <Link to="/table" style={{ textDecoration: 'none', color:'inherit' }}>
              <ListItem button>  
                <ListItemIcon className={classes.drawerContainer}><HomeIcon/></ListItemIcon>
                <ListItemText primary="지시사항1" />
              </ListItem>
              </Link>
              <Link to="/lookup" style={{ textDecoration: 'none', color:'inherit' }}>
              <ListItem button>  
                <ListItemIcon className={classes.drawerContainer}><HomeIcon/></ListItemIcon>
                <ListItemText primary="지시사항2" />
              </ListItem>
              </Link>
              <Link to="/lookup2" style={{ textDecoration: 'none', color:'inherit' }}>
              <ListItem button>  
                <ListItemIcon className={classes.drawerContainer}><HomeIcon/></ListItemIcon>
                <ListItemText primary="지시사항22" />
              </ListItem>
              </Link>

              {/* /////////////////CORE 끝////////////////////////////// */}

              {/* <p style={{fontSize:'15px',marginLeft:20}}>INTERFACE</p> 
              <ListItem button onClick={layoutHandle}>
                <ListItemIcon className={classes.drawerContainer}><MailIcon/></ListItemIcon>
                <ListItemText primary="Layouts" />
                <ExpandMoreIcon/>
              </ListItem>
              {layout && <ListItem style={{textAlign:'center', marginLeft:0}} button onClick={()=>{setChange(classes.drawerPaperBlack)}}><ListItemText  primary="Static Navigation" /></ListItem>}
              {layout && <ListItem style={{textAlign:'center'}} button onClick={()=>{setChange(classes.drawerPaperLight)}}><ListItemText primary="Light Sidenav" /></ListItem>}
              
              
              <ListItem button onClick={pageHandle}>
                <ListItemIcon className={classes.drawerContainer}><BookIcon/></ListItemIcon>
                <ListItemText primary="Page"/>
                <ExpandMoreIcon/>
              </ListItem>

              {page && <ListItem style={{textAlign:'center'}}  button onClick={authenticationHandle}><ListItemText primary="Authentication" /><ExpandMoreIcon style={{marginLeft:-30}}/></ListItem>}

              {authentication && <ListItem style={{textAlign:'center', display:'inline-block'}} button><ListItemText primary="Login" /></ListItem>}
              {authentication && <ListItem style={{textAlign:'center'}} button><ListItemText primary="Register" /></ListItem>}
              {authentication && <ListItem style={{textAlign:'center'}} button><ListItemText primary="Forgot Password" /></ListItem>}

              {page && <ListItem style={{textAlign:'center'}} button onClick={errorHandle}><ListItemText primary="Error" /><ExpandMoreIcon style={{marginLeft:35}}/></ListItem>}
              
              {error && <ListItem style={{textAlign:'center'}} button><ListItemText primary="401 Page" /></ListItem>}
              {error && <ListItem style={{textAlign:'center'}} button><ListItemText primary="404 Page" /></ListItem>}
              {error && <ListItem style={{textAlign:'center'}} button><ListItemText primary="500 Page" /></ListItem>}            */}
              
                      {/* ///////////////////// interface 끝 ///////////////////////////////////////// */}

              {/* <p style={{fontSize:'15px',marginLeft:20}}>ADDONS</p>
              <ListItem button>
                <ListItemIcon className={classes.drawerContainer}><MapIcon/></ListItemIcon>
                <ListItemText primary="Chart" />
              </ListItem>
              <ListItem button>
                <ListItemIcon className={classes.drawerContainer}><InboxIcon/></ListItemIcon>
                <ListItemText primary="Table" />
              </ListItem> */}
          </List>
        </div>
      </Drawer>
        </>
    );
};

export default Sidebar;
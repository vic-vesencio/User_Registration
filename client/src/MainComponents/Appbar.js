import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

//Material Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

const useStyles = makeStyles((theme) => ({
   userMenu: {
      width: '30%',
      textAlign: 'right',
   },
   menu: {
      width: '3%',
      textAlign: 'left',
   },
   scribe: {
      width: '27%',
      textAlign: 'left',
   },
   title: {
      width: '40%',
      textAlign: 'center',
   },
   list: {
      width: '20vw',
   },
   fullList: {
      width: 'auto',
   },
}));

export default React.memo(({centerTitle}) => {
   const history = useHistory();
   const classes = useStyles();
   const [menu, setMenu] = useState(false);
   const [darkMode, setDarkMode] = useState(localStorage.getItem("preferred-theme") === "dark" ? true : false);

   useEffect(() => {
      if(darkMode) localStorage.setItem("preferred-theme", "dark");
      else  localStorage.setItem("preferred-theme", "light");
   },[darkMode])

   return (
      <React.Fragment>
         <AppBar position="static" color="primary">
            <Toolbar variant="dense">
               <Box className={classes.menu}>
                  <IconButton edge="start" color="inherit" aria-label="menu"
                     onClick={()=>setMenu(true)}
                  >
                     <MenuIcon />
                  </IconButton>
               </Box>
               <Typography className={classes.scribe} variant="h6">
                  MERN | CRUD
               </Typography>
               <Typography className={classes.title} variant="h6">
                  {centerTitle}
               </Typography>
               <SwipeableDrawer
                  anchor={'left'}
                  open={menu}
                  onClose={()=>setMenu(false)}
                  onOpen={()=>setMenu(true)}
               >
                  <div>
                     <List className={classes.list}>
                        <ListItem button 
                           onClick={()=>{
                              setDarkMode(!darkMode);
                              history.go(0);
                           }}
                        >
                           <ListItemIcon>{darkMode  ? <ToggleOnIcon/> : <ToggleOffIcon/>} </ListItemIcon>
                           <ListItemText primary={'Dark Theme'} />
                        </ListItem>
                     </List>
                     <List className={classes.list}>
                        <ListItem button onClick={()=>history.push("/")}>
                           <ListItemIcon><DashboardIcon /> </ListItemIcon>
                           <ListItemText primary={'Todos'} />
                        </ListItem>
                     </List>
                  </div>
               </SwipeableDrawer>
            </Toolbar>
         </AppBar>
      </React.Fragment>
   );
});
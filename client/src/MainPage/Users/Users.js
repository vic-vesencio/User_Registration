import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosDefault from '../../config/axiosConfig';

//Components
import Appbar from '../../MainComponents/Appbar';

//Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton, Tooltip, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
}));
 

const Users = (props) => {
   const [users, setUsers] = useState(null);
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);

   useEffect(()=>{
      if(users === null){
         axios.get(axiosDefault.apiURL+'/api/users/get-all/', {crossdomain: true})
         .then(function (res) {
            console.log(res)
            setUsers(res.data);
         })
         .catch(function (err) {
            console.log(err)
         }) 
      }
   });

   return (
      <div>
         <Appbar centerTitle={'Users'} />
         <CssBaseline />
         <Container color="primary" maxWidth="md">
            <TableContainer theme='primary' component={Paper} style={{marginTop: '1rem'}}>
               <Table aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell component="th">Username</TableCell>
                     <TableCell align="right">
                        Add user
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {users !== null ?
                     users.map((user) => (
                        <TableRow key={user._id}>
                           <TableCell component="th" scope="row">
                              {user.username}
                           </TableCell>
                           <TableCell align="right">
                           </TableCell>
                        </TableRow>
                     ))
                     :
                     <TableRow>
                        <TableCell component="th" scope="row">
                           no users yet
                        </TableCell>
                     </TableRow>
                  }
               </TableBody>
               </Table>
            </TableContainer>
         </Container>
      </div>
   );
}

export default Users;

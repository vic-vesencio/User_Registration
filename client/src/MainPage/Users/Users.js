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
 

const Todos = (props) => {
   const [users, setUsers] = useState(null);
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [selectedID, selectID] = useState(null);

   useEffect(()=>{
      if(todos === null){
         axios.get(axiosDefault.apiURL+'/api/todos/get-all/', {crossdomain: true})
         .then(function (res) {
            console.log(res)
            setTodos(res.data)
         })
         .catch(function (err) {
            console.log(err)
         }) 
      }
   });

   return (
      <div>
         <Appbar centerTitle={'Todos'} />
         <CssBaseline />
         <Container color="primary" maxWidth="md">
            <TableContainer theme='primary' component={Paper} style={{marginTop: '1rem'}}>
               <Table aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell component="th">Username</TableCell>
                     <TableCell align="right">
                        <Tooltip title='create new user'>
                           <span>
                           <IconButton color="secondary" component="span"
                              onClick={()=>{
                                 setOpen(true)
                              }}
                           >
                              <AddCircleOutlineIcon />
                           </IconButton>
                           </span>
                        </Tooltip>
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
                              <Tooltip title='edit user'>
                                 <IconButton color="secondary" component="span"
                                    onClick={()=>setOpenEdit(true)}
                                 >
                                    <EditIcon />
                                 </IconButton>
                              </Tooltip>
                              <Tooltip title='edit todo'>
                                 <IconButton color="secondary" component="span"
                                    onClick={()=>{
                                       selectID(user._id);
                                       setOpen
                                    }}
                                 >
                                    <EditIcon />
                                 </IconButton>
                              </Tooltip>
                           </TableCell>
                        </TableRow>
                     ))
                     :
                     <TableRow>
                        <TableCell component="th" scope="row">
                           no todos yet
                        </TableCell>
                     </TableRow>
                  }
               </TableBody>
               </Table>
            </TableContainer>
         </Container>
         <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <div className={classes.paper}>
                  <p>Enter new description</p>
                  <TextField
                     style={{width: '100%'}}
                     label="edit description"
                     margin="dense"
                     variant="outlined"
                  />
                  <Button color='secondary'>save</Button>
                  <Button onClick={()=>handleClose()} color='secondary'>close</Button>
               </div>
            </Fade>
         </Modal>
      </div>
   );
}

export default Todos;

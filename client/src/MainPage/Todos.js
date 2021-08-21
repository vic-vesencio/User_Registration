import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosDefault from '../config/axiosConfig';

//Components
import Appbar from '../MainComponents/Appbar';

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
   const [todos, setTodos] = useState(null);
   const [desc, setDesc] = useState('');
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const [selectedID, selectID] = useState(null);
   const [newDesc, setNewDesc] = useState('');
 
   const handleOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

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
            <Typography variant="h6">
               Todos
            </Typography>

            <TableContainer theme='primary' component={Paper}>
               <Table aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell component="th">Description</TableCell>
                     <TableCell align="right">
                        <TextField
                           value={desc}
                           onChange={e=>setDesc(e.target.value)}
                           label="Add todo"
                           margin="dense"
                           variant="outlined"
                        />
                        <Tooltip title='add todo'>
                           <span>
                           <IconButton disabled={desc === '' ? true : false} color="secondary" component="span"
                              onClick={()=>{
                                 let reqbody = {
                                    description: desc
                                 }
                                 axios.post(axiosDefault.apiURL+'/api/todos/add', reqbody, {crossdomain: true})
                                 .then(function (res) {
                                    console.log(res)
                                    setDesc('');
                                    setTodos(null)
                                 })
                                 .catch(function (err) {
                                    console.log(err)
                                 }) 
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
                  {todos !== null ?
                     todos.map((todo) => (
                        <TableRow key={todo._id}>
                           <TableCell component="th" scope="row">
                              {todo.description}
                           </TableCell>
                           <TableCell align="right">
                              <Tooltip title='delete todo'>
                                 <IconButton color="secondary" component="span"
                                    onClick={()=>{
                                       axios.delete(axiosDefault.apiURL+'/api/todos/delete/'+todo._id, {crossdomain: true})
                                       .then(function (res) {
                                          console.log(res)
                                          setTodos(null)
                                       })
                                       .catch(function (err) {
                                          console.log(err)
                                       }) 
                                    }}
                                 >
                                    <DeleteIcon />
                                 </IconButton>
                              </Tooltip>
                              <Tooltip title='edit todo'>
                                 <IconButton color="secondary" component="span"
                                    onClick={()=>{
                                       selectID(todo._id);
                                       handleOpen();
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
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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
                     value={newDesc}
                     onChange={e=>setNewDesc(e.target.value)}
                     label="edit description"
                     margin="dense"
                     variant="outlined"
                  />
                  <Button color='secondary'
                     onClick={()=>{
                        let reqbody ={
                           description: newDesc
                        }
                        axios.put(axiosDefault.apiURL+'/api/todos/update/'+selectedID, reqbody,{crossdomain: true})
                        .then(function (res) {
                           setTodos(null)
                           console.log(res)
                        })
                        .catch(function (err) {
                           console.log(err)
                        }) 
                        handleClose();
                     }}
                  >save</Button>
                  <Button onClick={()=>handleClose()} color='secondary'>close</Button>
               </div>
            </Fade>
         </Modal>
      </div>
   );
}

export default Todos;

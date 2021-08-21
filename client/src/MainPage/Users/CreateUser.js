import React, {useContext, useState} from 'react';
import axios from 'axios';
import axiosDefault from '../../config/axiosConfig';

import { 
   IconButton, 
   Tooltip, 
   TextField,
   Modal,
   Backdrop,
   Fade,
   Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';

//context
import UserContext from '../../Context/UserContext';

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
      width: '40vw'
   },
   input: {
      width: '100%',
   }
}));

const CreateUser = () => {
   const classes = useStyles();
   const newUserContext = useContext(UserContext);
   const [open, setOpen] = React.useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [passVisible, setPassVisible] = useState(false);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [middleName, setMiddleName] = useState('');
   const [email, setEmail] = useState('');
 
   const handleOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

   const createUser = (e) =>{
      e.preventDefault();
      let newUser = {
         username, password, firstName, lastName, middleName, email
      }
      axios.post(axiosDefault.apiURL+'/api/users/create/', newUser, {crossdomain: true})
      .then(function (res) {
         console.log(res)
         newUserContext.setUsers(null);
      })
      .catch(function (err) {
         console.log(err)
      }) 
   }
 
   return (
      <div>
         <Tooltip title="create user">
            <IconButton onClick={handleOpen}>
               <AddCircleOutlineIcon />
            </IconButton>
         </Tooltip>
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
                  <form onSubmit={(e)=>createUser(e)}>
                     <h2>Create new user</h2>
                     <TextField
                        required
                        className={classes.input}
                        value={username}
                        onChange={e=>{
                           let value = (e.target.value).slice(0,12);
                           setUsername(value);
                        }}
                        variant="outlined"
                        margin="dense"
                        placeholder="username"
                     />
                     <TextField
                        required
                        type={passVisible ? 'text': 'password'}
                        style={{width: '90%'}}
                        value={password}
                        onChange={e=>{
                           let value = (e.target.value).slice(0,12);
                           setPassword(value);
                        }}
                        variant="outlined"
                        margin="dense"
                        placeholder="password"
                     />
                     <Tooltip title='see password?'>
                        <IconButton style={{width: '10%'}} onClick={()=>setPassVisible(!passVisible)}>
                           {passVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                     </Tooltip>
                     <TextField
                        required
                        className={classes.input}
                        value={firstName}
                        onChange={e=>setFirstName(e.target.value)}
                        variant="outlined"
                        margin="dense"
                        placeholder="first name"
                     />
                     <TextField
                        required
                        className={classes.input}
                        value={middleName}
                        onChange={e=>setMiddleName(e.target.value)}
                        variant="outlined"
                        margin="dense"
                        placeholder="middle name"
                     />
                     <TextField
                        required
                        className={classes.input}
                        value={lastName}
                        onChange={e=>setLastName(e.target.value)}
                        variant="outlined"
                        margin="dense"
                        placeholder="last name"
                     />
                     <TextField
                        required
                        type='email'
                        className={classes.input}
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        variant="outlined"
                        margin="dense"
                        placeholder="email"
                     />
                     <Button type='submit' color="secondary">Create</Button>
                     <Button type='button' color="secondary" onClick={()=>handleClose()}>Close</Button>
                  </form>
               </div>
            </Fade>
         </Modal>
      </div>
   );
}
export default CreateUser;
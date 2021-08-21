import React, {useContext} from 'react';
import axios from 'axios';
import axiosDefault from '../../config/axiosConfig';

import { 
   IconButton, 
   Tooltip,
   Modal,
   Backdrop,
   Fade,
   Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import DeleteIcon from '@material-ui/icons/Delete';
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

const DeleteUser = ({props}) => {
   const classes = useStyles();
   const newUserContext = useContext(UserContext);
   const [open, setOpen] = React.useState(false);
 
   const handleOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };

   const deleteUser = () =>{
      axios.delete(axiosDefault.apiURL+'/api/users/delete/'+props.id, {crossdomain: true})
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
         <Tooltip title="delete user">
            <IconButton onClick={handleOpen}>
               <DeleteIcon />
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
                  <h2>Delete {props.username} ??</h2>
                  <Button type='submit' color="secondary" onClick={()=>deleteUser()}>Yes</Button>
                  <Button type='button' color="secondary" onClick={()=>handleClose()}>Close</Button>
               </div>
            </Fade>
         </Modal>
      </div>
   );
}
export default DeleteUser;
import React from 'react';

import { 
   IconButton, 
   Tooltip, 
   TextField,
   Modal,
   Backdrop,
   Fade
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';

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
      width: '50vw'
   },
   input: {
      width: '100%',
   }
}));

const CreateUser = () => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
 
   const handleOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setOpen(false);
   };
 
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
               <h2>Create new user</h2>
               <TextField
                  variant="outlined"
                  margin="dense"
                  placeholder="username"
               />
            </div>
            </Fade>
         </Modal>
      </div>
   );
}
export default CreateUser;
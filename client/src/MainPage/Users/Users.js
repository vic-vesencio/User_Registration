import React, {useState, useEffect} from 'react';
import axios from 'axios';
import axiosDefault from '../../config/axiosConfig';

//Components
import Appbar from '../../MainComponents/Appbar';

//Material UI
import Container from '@material-ui/core/Container';
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Users components
import CreateUser from './CreateUser'; 
import DeleteUser from './DeleteUser'

//context
import UserContext from '../../Context/UserContext';

const Users = (props) => {
   const [users, setUsers] = useState(null);

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
      <UserContext.Provider value={{users, setUsers}}>
         <Appbar centerTitle={'Users'} />
         <CssBaseline />
         <Container color="primary" maxWidth="md">
            <TableContainer theme='primary' component={Paper} style={{marginTop: '1rem'}}>
               <Table aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell component="th">Username</TableCell>
                     <TableCell component="th">first name</TableCell>
                     <TableCell component="th">last name</TableCell>
                     <TableCell component="th">middle name</TableCell>
                     <TableCell component="th">email</TableCell>
                     <TableCell align="right">
                        <CreateUser />
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
                           <TableCell component="th" scope="row">
                              {user.firstName}
                           </TableCell>
                           <TableCell component="th" scope="row">
                              {user.lastName}
                           </TableCell>
                           <TableCell component="th" scope="row">
                              {user.middleName}
                           </TableCell>
                           <TableCell component="th" scope="row">
                              {user.email}
                           </TableCell>
                           <TableCell align="right">
                              <DeleteUser props={{username: user.username, id: user._id}} />
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
      </UserContext.Provider>
   );
}

export default Users;

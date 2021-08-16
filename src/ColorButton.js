import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';


const ColorButton = () => {
    return(
      <Button 
      style={{backgroundColor: '#8e24aa', color: '#FFFFFF', marginBottom:'20px',
      borderRadius:30
    }}
    onClick={()=>{
      axios.get(`https://flutter.smarttersstudio.com/test/login.php?user=${email}&pass=${password}`).then(
        res=>{
          const {result,id,reason}= res.data;
          if(result){
            enqueueSnackbar(`Login Successful,Your id is ${id}`,{variant: 'success'});
          }
          else{
          enqueueSnackbar(reason,{variant: 'error'});
          }
        }
      ).catch(
        e=>enqueueSnackbar(e.message,{variant:'error'})
      ).finally(

      )
    }}
      >LOGIN</Button>
    )
  }
  
 export default ColorButton;

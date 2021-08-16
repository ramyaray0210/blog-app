import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IconButton, InputAdornment, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import axios from 'axios';
import {useSnackbar} from 'notistack';
//import { SnackbarProvider } from "notistack";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Router } from '@material-ui/icons';
import { useRouter } from 'next/router';


//import ColorButton from '../src/ColorButton';


export default function Login(){

    const [visible,setVisible] = React.useState('');
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [loading,setLoading]=React.useState('');
    const{enqueueSnackbar}=useSnackbar();
    const Router = useRouter();

    return(
        <div style={{
            backgroundColor:'#7b1fa2',
            backgroundSize:'cover'
           
      }}>
        <Container maxWidth='sm' style={{
          paddingTop:'50px',
          paddingBottom:'45px',
          backgroundColor:'#7b1fa2',
          paddingLeft:'80px',
          paddingRight:'80px',
          
         
        }} >
            <Paper elevation ={5} style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                padding:'50px',
                marginTop:'100px',
                marginBottom:'100px'
            }}>
            <Avatar style={{
                height:'60px',
                width:'60px',
                marginBottom:'20px',
                alignSelf:'center',
                backgroundColor:'#7b1fa2'
            }}>A</Avatar>   
                <TextField 
                variant='outlined' 
                label="Email" 
                style={{
                    marginBottom:'30px'
                }} 
                type={'email'} 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                InputProps={{
                    startAdornment:
                    <InputAdornment position='start'>
                        <IconButton edge='start'>
                            <EmailIcon/>
                        </IconButton>
                    </InputAdornment>
                }} ></TextField>
                <TextField variant='outlined' label="Password" style={{
                    marginBottom:'30px'
                }} type={visible?'text':'password'}
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}
                InputProps={{
                    endAdornment:
                    <InputAdornment position='end'>
                        <IconButton edge='end' onClick={()=>{
                            setVisible(!visible)
                        }}>
                            {visible?< VisibilityIcon/>:<VisibilityOffIcon/>}
                        </IconButton>
                    </InputAdornment>
                }}
                ></TextField>
                <Button 
      style={{backgroundColor: '#8e24aa', color: '#FFFFFF', marginBottom:'20px',paddingTop:'10px',
      borderRadius:30,
      paddingBottom:10
    }}
    disabled={loading}
    onClick={()=>{
        setLoading(true);
        axios.get(`https://flutter.smarttersstudio.com/test/login.php?user=${email}&pass=${password}`).then(
          res=>{
            const {result,id,reason}= res.data;
            if(result){
              enqueueSnackbar(`Login Successful,Your id is ${id}`,{variant: 'success'});
              const userId = localStorage.setItem('userId',res.data.id);
              Router.push('/dashboard');
            }
            else{
            enqueueSnackbar(reason,{variant: 'error'});
            }
          }
        ).catch(
          e=>enqueueSnackbar(e.message,{variant:'error'})
        ).finally(
            () => setLoading(false)
        )
      }}
    >{loading?<CircularProgress/>:'Login'}</Button>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between'
                    
                }}>
                  <Typography>Sign up</Typography>
                  <Typography>Forgot password</Typography>
                </div>
            </Paper>
        </Container>
        </div>
     
        
    )
};


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
import ColorButton from '../src/ColorButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CallIcon from '@material-ui/icons/Call';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import {useSnackbar} from 'notistack';


export default function Signup(){

    const [visible,setVisible] = React.useState('');
    const [name,setName]= React.useState('');
    const [phoneno,setPhoneno]= React.useState('');
    const [gender,setGender]= React.useState(0);
    const [email,setEmail]= React.useState('');
    const [password,setPassword]=React.useState('');
    const [loading,setLoading]=React.useState('');
    const{enqueueSnackbar}=useSnackbar();

    return(
        <div style={{
            backgroundColor:'#7b1fa2',
            backgroundSize:'cover'
           
      }}>
        <Container maxWidth='sm' style={{
          paddingTop:'70px',
          paddingBottom:58,
          backgroundColor:'#7b1fa2',
          paddingLeft:'50px',
          paddingRight:'50px',
          
         
        }} >
            <Paper elevation ={5} style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                padding:'50px',
                marginTop:'20px',
                marginBottom:'20px'
            }}> 
            <TextField variant='outlined' label="Name" style={{
                marginBottom:'20px'
            }} autoFocus InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <IconButton edge='start'>
                        <AccountCircleIcon/>
                    </IconButton>
                </InputAdornment>
            }} 
            value={name}
            onChange={(e)=>setName(e.target.value)}>
            </TextField>
            <TextField variant='outlined' label="phone" type="number" style={{
                marginBottom:'20px'
            }} InputProps={{
                startAdornment:
                <InputAdornment position='start'>
                    <IconButton edge='start'>
                        <CallIcon/>
                    </IconButton>
                </InputAdornment>
            }}
            value={phoneno}
            onChange={(e)=>{setPhoneno(e.target.value)
                console.log(phoneno)
            }}
            >
           
            
             </TextField>  

                <TextField variant='outlined' label="Email" style={{
                    marginBottom:'20px'
                }} type={'email'} InputProps={{
                    startAdornment:
                    <InputAdornment position='start'>
                        <IconButton edge='start'>
                            <EmailIcon/>
                        </IconButton>
                    </InputAdornment>
                }} 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
                </TextField>
                <TextField variant='outlined' label="Password" style={{
                    marginBottom:'30px'
                }} type={visible?'text':'password'}
                InputProps={{
                    endAdornment:
                    (<InputAdornment position='end'>
                        <IconButton edge='end' onClick={()=>{
                            setVisible(!visible)
                        }}>
                            
                            {visible?< VisibilityIcon/>:<VisibilityOffIcon/>}
                        </IconButton>
                    </InputAdornment>),
                    startAdornment : (
                        <InputAdornment position='start'>
                            <LockIcon />
                        </InputAdornment>
                    )
                  }}
                  value={password}
            onChange={(e)=>setPassword(e.target.value)}
                  
                ></TextField>
                <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1"  style={{
        marginBottom:'20px'
    }}
    value={gender}
            onChange={(e)=>{setGender(e.target.value)
             
               console.log(e.target.value)
            }}>
                  
            <div style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-around',
                marginBottom:'20px'
            }}>
      
        <FormControlLabel value={'2'}  control={<Radio/>} label="Female"/>
        <FormControlLabel value={'1'}  control={<Radio />} label="Male"/>
        <FormControlLabel value={'3'}  control={<Radio />} label="Other" />
     </div>
    </RadioGroup>
    </FormControl>
    <Button 
    style={{backgroundColor: '#8e24aa', color: '#FFFFFF', marginBottom:'20px',
    borderRadius:30
  }}
  onClick={()=>{
    setLoading(true);
    axios.get(`https://flutter.smarttersstudio.com/test/signup.php?name=${name}&phone=${phoneno}&email=${email}&gender=${gender}&password=${password}`).then(
      res=>{
        const {result,reason}= res.data;
        if(result){
          enqueueSnackbar(`Registration Successful`,{variant: 'success'});
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
  >{loading?<CircularProgress/>:'SIGNUP'}</Button>
            </Paper>
        </Container>
        </div>
        
        
    )
};


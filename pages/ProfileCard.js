import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import {CircularProgress} from '@material-ui/core';


const ProfileCard = ()=>{

const[userInfo,setUserInfo]=useState();
const[loading,setLoading]=useState(true);
const {enqueueSnackbar} = useSnackbar();

useEffect(()=>{
    const userId = localStorage.getItem('userId');
    axios.get(`https://flutter.smarttersstudio.com/test/profile.php?id=${userId}`).then(
        res =>{
            setUserInfo(res.data);
        }
    ).catch(
        e=>{
            enqueueSnackbar(e.message,{variant: 'error'});
        }
    ).finally(
        ()=>{setLoading(false);}
    );
},[]);

const getGender = (value)=>{
    if(value === 1)
       return 'Male';
    if (value === 2)
        return 'Female';
    
    return 'Others';
};


    return(
        <Grid item  style={{ paddingLeft:10,
            position:'fixed'
        }} xs={3}>
            <Paper elevation ={3} style={{
                height: 350,
                 width: 355,
                 display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>{loading?<CircularProgress  style={{
                alignSelf: 'center'
            }}/>:<div><div style={{backgroundColor:'#7b1fa2',
            paddingBottom:60}}></div>
   <Avatar style={{
       alignSelf:'center',
       width:'80px',
       height:'80px',
       marginLeft:'130px',
       marginTop:'40px',
       marginBottom:'10px',
       justifyContent:'center',
   }}>{userInfo.name.charAt(0)}</Avatar>
   <div style={{
       display:'flex',
       flexDirection:'column',
       paddingTop:20,
       alignItems:'center',
       justifyContent:'space-evenly',
       marginBottom:'10px'

   }}>
   <Typography variant='h6'>{userInfo.name}</Typography>
   <Typography variant='h6'>{userInfo.email}</Typography>
   <Typography variant='h6'>{userInfo.phone}</Typography>
   <Typography variant='h6'>{getGender(userInfo.gender)}</Typography>
   </div></div>}
            
          </Paper>
        </Grid>
    )
};
export default ProfileCard;
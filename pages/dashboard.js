import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import {useRouter} from 'next/router';
import ProfileCard from './ProfileCard';
import PostCard from './PostCard';
import AddPost from './AddPost';
//import { ContactPhoneTwoTone } from '@material-ui/icons';


export default function dashboard(){
    const Router = useRouter();
    useEffect(()=>{
        const userId=localStorage.getItem('userId');
        if(!userId){
            Router.push('/index');
        }
    },[]);

    return(
        <div>
        <div>
        <AppBar style={{ margin: 0 ,backgroundColor:'#7b1fa2'}}>
        <Toolbar variant="dense">
            <IconButton edge="start"  color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
                <Typography variant="h6" color="inherit" style={{
                    paddingLeft:20
                }}>
                  DASHBOARD
                </Typography>
        </Toolbar>
    </AppBar>
        </div>
         <div style={{
             paddingTop:60,
             justifyContent:'space-evenly' 
         }}>
           <Grid container>
               <ProfileCard/>
        
                <Grid item  style={{ paddingLeft:10}} xs={3}></Grid>
                <PostCard/>
                
                   
              <AddPost/>
             </Grid>
             </div>
        </div>
      
    )
};
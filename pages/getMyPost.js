import React, { useEffect ,useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import {useRouter} from 'next/router';
import {useSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

export default function getMyPost(){
    const Router = useRouter();
    const [allPosts,setAllPosts] = useState(true);
    const [loading , setLoading] = useState(true);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(()=>{
        const userId=localStorage.getItem('userId');
        if(!userId){
            Router.push('/dashboard');
        }
        else{
            axios.get(`https://flutter.smarttersstudio.com/test/getMyPosts.php?id=${userId}`).then(
               res=>{
                setAllPosts(res.data);
               } 
            ).catch(
                e=>{
                    enqueueSnackbar(e.message,{variant:'error'});
                }
            ).finally(
                ()=>{
                    setLoading(false);
                }
            );
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
                MY POSTS
                </Typography>
        </Toolbar>
    </AppBar>
        </div>
         <div style={{
             paddingTop:60,
             justifyContent:'space-evenly' 
         }}>
           <Grid container>
           <Grid item xs={6}  style={{ paddingLeft:300
           }}>
              <Paper elevation ={3} style={{
                   width: 725,
                   display:'flex',
                   flexDirection:'column',
                   justifyContent:'space-evenly'
                  
              }}><div style={{backgroundColor:'#7b1fa2',
              paddingBottom:60,marginBottom:10}}></div>
              {loading?<CircularProgress style={{alignSelf:'center',padding:'30px'}}/>:allPosts.map(
                post => (<div>
                    <Paper key ={post} elevation={3} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 10
                }}>
                
                    <div style={{marginLeft:10}}><b>NAME: </b> {post.name}</div><br/>
                    <div style={{marginLeft:10}}><b>TITLE : </b> {post.title}</div><br/>
                    <div style={{marginLeft:10}}><b>DESCRIPTION : </b> {post.description}</div><br/>
                    <div style={{marginLeft:10}}><b>UPLOAD DATE : </b> {post.timestamp}</div><br/>
                </Paper></div>)
            )
              }
              </Paper>
   
              </Grid>
             </Grid>
             </div>
        </div>
      
    )
};
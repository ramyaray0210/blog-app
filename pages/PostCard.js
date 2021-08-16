import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSnackbar} from 'notistack';
import {CircularProgress} from '@material-ui/core';

const PostCard=()=>{
    const [allPosts,setAllPosts] = useState(true);
    const [loading , setLoading] = useState(true);
    const {enqueueSnackbar} = useSnackbar();

        useEffect(()=>{
            const userId = localStorage.getItem('userId');
            axios.get(`https://flutter.smarttersstudio.com/test/getAllPosts.php?id=${userId}`).then(
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
        },[]);


    return(
        <Grid item xs={6}  style={{ paddingLeft:15
        }}>
           <Paper elevation ={3} style={{
                width: 725,
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-evenly'
               
           }}><div style={{backgroundColor:'#7b1fa2',
           paddingBottom:60,marginBottom:10}}></div>{loading?<CircularProgress style={{alignSelf:'center',padding:'30px'}}/>:allPosts.map(
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
    )
};

export default PostCard;
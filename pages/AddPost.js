import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSnackbar} from 'notistack';
import { useRouter } from 'next/router';
import { Router } from '@material-ui/icons';



const AddPost = ()=>{

    const [titles,setTitles] = React.useState('');
    const [description,setDescription] = React.useState('');
    const [loading,setLoading] = React.useState();
    const {enqueueSnackbar} = useSnackbar();
    const Router = useRouter();

    const handleClick = ()=>{ 
        
    Router.replace('/getMyPost');
     }


    return(
        <div>
        <Grid item  style={{ paddingLeft:10}} xs={3}></Grid>
        <Grid item xs={3} style={{position:'fixed'}} >
        <Paper elevation ={3} style={{
             width: 365,
             marginLeft:'10px',
             marginRight:'10px'
        }}>
        <div style={{backgroundColor:'#7b1fa2',
                     paddingBottom:60}}></div>

                     <TextField style={{paddingLeft:'30px',
                            paddingTop:'20px'
                    }}
                     placeholder="Title"
                     onChange = {(e)=>{setTitles(e.target.value)}}
                     multiline
                   />            
    <div style={{
        display:'flex',
        flexDirection:'row',
        paddingTop:'15px',
        alignItems:'center',
        justifyContent:'space-around',
        paddingBottom:'10px'
    }}>
  
    <TextField
          placeholder="Description.."
          onChange = {(e)=>{setDescription(e.target.value)}}
          multiline
        />
        
        <Button
        variant="contained"
        style={{
            backgroundColor:'#7b1fa2',
            borderRadius:'30px',
            paddingRight:10,
            paddingLeft:10}}
            
            onClick={()=>{
                setLoading(true);
                const userId =localStorage.getItem('userId');
                axios.get(`https://flutter.smarttersstudio.com/test/addPost.php?id=${userId}&title=${titles}&body=${description}`).then(
                    res=>{
                        const {result,reason} = res.data;
                        
                        if(result){
                            enqueueSnackbar(`postAdded`,{variant: 'success'});
                        }
                        else{
                            enqueueSnackbar(reason,{variant: 'error'}); 
                        }
                    }

                ).catch(
                    (e)=>{
                        enqueueSnackbar(e.message,{variant: 'error'});
                    }
                ).finally(
                    ()=>{
                        setLoading(false);
                    }
                )
            }
                
            }
            >{loading?<CircularProgress/>:<SendIcon/>}</Button></div>
    
        </Paper>
        <div>
            <Button style={{
                color:'white',
                marginTop:20,
                marginLeft:'100px',
                padding:10,
                paddingLeft:50,
                paddingRight:50,
                backgroundColor:'#7b1fa2',
                alignSelf:'center',
                
            }}
            onClick={handleClick}
            >GO TO MY POSTS</Button>
        </div>
    </Grid>
    </div> )
};
export default AddPost;

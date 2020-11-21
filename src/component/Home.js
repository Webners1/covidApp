import React, { Component,useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import CountUp from 'react-countup'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
    
},
Appbar:{
  backgroundColor:'green'
   

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    
  },
  MainBox:{

  },
  SideBox:{
margin:'5px',
padding:'5px',
boxShadow:'0px 2px 5px 1px #d1d1d1',

backgroundColor:'white',
'& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  Box:{
    padding:'10px',
margin:'10px',
width:'300px',
height:'150px',
alignItems:'center',
marginLeft:'19%',
textAlign:'center',
color:'blue'
  },
  text:{
margin:'0',

color:'darkgreen'
  },
  mainSubBox:{
    textAlign:'center',
    justifyContent:'center',
    marginTop:'10px',
    width:'300px',
    height:'200px'

  },
  countryMainBox:{
 display:'flex',
 margin:'10px',
 
 alignItems: 'center',
  justifyContent: 'center',
  },
  countSubBox1:{
    margin:'5px',
    padding:'10px',
    width:'300px',
    height:'200px',
     '&:hover':{
boxShadow:'2px 2px 5px 3px rgb(0, 79, 65,0.8)'
    }
  },
  countSubBox2:{
    margin:'5px',
    padding:'10px',
    width:'300px',
    height:'200px',
    
    '&:hover':{
      
boxShadow:'2px 2px 5px 3px rgb(79, 0, 0,0.8)'
    },
   
  },
  countSubBox3:{
    margin:'5px',
    padding:'10px',
    width:'300px',
    height:'200px',
      '&:hover':{
boxShadow:'2px 2px 5px 3px rgb(0, 32, 79,0.8)'
    },
   
  }
  
}));
const useTypeStyles = makeStyles({
    root:{
        width:'100%',
        maxWidth:'500',
       
        
    },
    countBox:{

fontSize:'30px',
textAlign:'center',
 fontWeight:'700',
    fontSize:'40px',
    fontFamily:'san-serif'
    },
})

function ButtonAppBar() {
  const classes = useTypeStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.Appbar}>
        <Toolbar>
        
          <Typography variant="h4" style={{textAlign:'center'}}>
            Covid-19 Tracker
          </Typography>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default function Home(){
  const[values,setValue] = useState('USA');
    const[data,setData]=useState({}); 
    const [dataState,setDataState] = useState(false)
    const [countryDataState,setCountryDataState] = useState(false)
    const[countryData,setCountryData] = useState({})
  const classes = useStyles();
const TypographyClass = useTypeStyles();
useEffect(()=>{
    async function fetchData(){
    const apiResponse = await fetch(' https://covid19.mathdro.id/api');
    console.log(apiResponse);
    const dataFromApi = await apiResponse.json(); 
    console.log(dataFromApi);
    setData(dataFromApi);
    setDataState(true)
}
    fetchData();
},[])
const option = countryList().getData();
const changeHandler=(e)=>{
  
  setValue(e.label);
  
}
        useEffect(()=>{
            async function fetchCountryData(){
            const countryApiResponse = await fetch(`https://covid19.mathdro.id/api/countries/${values}`);
            console.log(countryApiResponse);
            const countryDataFromApi = await countryApiResponse.json(); 
            console.log(countryDataFromApi);
            console.log(countryDataFromApi.error)
            setCountryData(countryDataFromApi);
            setCountryDataState(true)
            
              
            
        }
            fetchCountryData();
        },[values])

       

        if(!dataState){
          return(
<CircularProgress color="secondary" />
          )
        }
            if(!countryDataState){
              return(
  <CircularProgress color="secondary" />
                
              )
            }
    return(
<div>
    <ButtonAppBar/>
        <br/>
    <Grid container direction='row' spacing={3}>
        <Grid item lg={1}/> 
        <Grid item lg={3} md={4} sm={6} xs={12}>      
         <Paper elevation={4} style={{width:'100%',position:'relative',justifyContent:'center',alignItems:'center'}}>
           <Typography style={{fontSize:'33px',fontWeight:'600',color:'black',textAlign:'center',textDecoration:'underline'}}>
Total As of Today:
           </Typography>
         <Paper elevation={3} className={classes.Box} style={{borderBottom:'7px solid #636200'}}>
             <div className={TypographyClass.root}>
            <Typography variant='h4' style={{fontWeight:'600',color:'#807e00'}} className={classes.text}>
<CountUp start={0} end={dataState?data.confirmed.value:'Loading...'} duration={2.5} separator=','/>

                </Typography>
                <Typography variant='subtitle1' style={{color:'#636200',fontSize:'20px',fontWeight:'600'}} className={classes.text}>
                cases
                </Typography>
              </div></Paper>
            <Paper elevation={3}  className={classes.Box} style={{borderBottom:'7px solid #6b003e'}}>
            <div className={TypographyClass.root}>
            <Typography variant='h4' style={{fontWeight:'600',color:'#6b003e'}}className={classes.text}>
<CountUp start={0} end={dataState?data.recovered.value:<CircularProgress color="secondary" />} duration={2.5} separator=','/>
                </Typography>
                <Typography variant='subtitle1'  style={{color:'#001114',fontSize:'20px',fontWeight:'600'}}className={classes.text}>
                Recovered
                </Typography>
                </div></Paper> 
            <Paper elevation={3}  className={classes.Box} style={{borderBottom:'7px solid #00424d'}} >
            <div className={TypographyClass.root}>
            <Typography variant='h4'className={classes.text}
           style={{color:'#00424d',fontWeight:'600'}}>

<CountUp start={0} end={dataState?data.deaths.value:<CircularProgress color="secondary" />} duration={2.5} separator=','/>

                </Typography>
                <Typography variant='subtitle1' className={classes.text} style={{color:'#001114',fontSize:'20px',fontWeight:'600'}}>
                Deaths
                </Typography>
                </div></Paper>
            
                </Paper>
            </Grid>
        <Grid item xs={12} lg={8} md={6} sm={10}>
        <Paper elevation={2}  className={classes.MainBox}>
             <div className={TypographyClass.root}>
            <Typography variant='h4'className={classes.text}style={{textAlign:'center',fontWeight:'600',color:'#001114'}}>
Country Wise Cases:
                </Typography>
                <Typography variant='h4' style={{textAlign:'center',fontWeight:'600',fontFamily:'serif',textDecoration:'underline'}}>
{values}
                </Typography>
<Select
        options={option}
        value={values}
        onChange={(e)=>changeHandler(e)}
      />
                </div>          
            </Paper>
            <Grid container direction='column'>
            <Paper variant={3} className={classes.countryMainBox}>
                 {countryData.error !== undefined  ?(
                   <div>
<h1>Data Not available for this country</h1>
                     </div>
                   ):(
                     
                     
                     <div>
                     
                    <Grid item lg={4}>
                      
                      <Paper className={classes.countSubBox1}>
               <Typography className={TypographyClass.countBox} style={{color:'#636200'}}>
<CountUp start={0} end={countryDataState?countryData.confirmed.value:'Loading...'} duration={2.5} separator=','/>
               </Typography>
              
              
              <Typography style={{textAlign:'center',fontSize:'25px',fontWeight:'600',color:'black',fontFamily:'Times New Roman", Times, serif'}}>
Cases
              </Typography>
            </Paper>
            </Grid>
            <Grid item lg={4}>
             <Paper variant={3}  className={classes.countSubBox2}>
              <Typography className={TypographyClass.countBox} style={{color:'#6b003e'}}>
<CountUp start={0} end={countryDataState?countryData.recovered.value:'Loading...'} duration={2.5} separator=','/>

              </Typography>
              <Typography style={{textAlign:'center',fontSize:'25px',fontWeight:'600',color:'black',fontFamily:'Times New Roman", Times, serif'}}>
                   Recovered
                 </Typography >
            </Paper>
            </Grid>
            <Grid item lg={4}>
             <Paper variant={3} className={classes.countSubBox3}  >
              <Typography className={TypographyClass.countBox} style={{color:'#001114'}}>
<CountUp start={0} end={countryDataState?countryData.deaths.value:'Loading...'} duration={2.5} separator=','/>

              </Typography>
                 <Typography style={{textAlign:'center',fontSize:'25px',fontWeight:'600',color:'black',fontFamily:'Times New Roman", Times, serif'}}>
Deaths
                 </Typography>
            </Paper>
            </Grid>
              </div>
                   )}
            
            
            </Paper>
            </Grid>
                   </Grid>            
              
            <Grid item lg={1} md={false} sm={false} xs={false}/> 
       

    </Grid>
</div>
    )
}
import Head from 'next/head'
import styles from '../../styles/owner/CreateSpace.module.scss';
import { useState } from 'react';
import { Grid, Select, FormControl, MenuItem } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     width: 400,
//   }
// }));

const CreateSpacePage = () => {

  // const classes = useStyles();

  const [age, setAge] = useState('');
  const [basicAddress, setBasicAddress] = useState({
    primary: '',
    secondary: '',
    zipCode: ''
  })

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Space</title>
      </Head>

      <Grid container justify='center' spacing={6}>
        <Grid item xs={10} md={3}>
          <div className={styles.stepBasic}>
            BASIC INFO
          </div>
        </Grid>
        <Grid item xs={10} md={3}>
          <div className={styles.stepRoom}>
            BASIC INFO
          </div>
        </Grid>
        <Grid item xs={10} md={3}>
          <div className={styles.stepFinal}>
            BASIC INFO
          </div>
        </Grid>
      </Grid>

      <Grid container justify='center' spacing={4}>
        <Grid item xs={12} md={10} xl={8}>
          <div className={styles.boardBasic}>
            <Grid container>
              <Grid item xs={12} lg={6} className={styles.leftDiv}>
                <p>Turn your space into cash</p>
                <div className={styles.logoDiv}>
                  <img src='/assets/logo.png' alt='logo'/>
                  <p>QUIK <span>SESSION</span></p>
                </div>
              </Grid>
              <Grid item xs={12} lg={6} className={styles.shadowDiv}>
              </Grid>
            </Grid>
            <div className={styles.formDiv}>
              <p>WHAT TYPE OF SPACE DO YOU HAVE?</p>
              <Grid container>
                <Grid item xs={12} lg={10}>
                  <FormControl className={styles.typeSelect}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Music Studio'}>Music Studio</MenuItem>
                      <MenuItem value={'Photo/Filming Studio'}>Photo/Filming Studio</MenuItem>
                      <MenuItem value={'DJ'}>DJ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <p>WHAT IS THE ADDRESS TO YOUR SPACE?</p>
              <Grid container>
                <Grid item xs={12} lg={10}>
                  <input 
                    name='primary_address' 
                    type='text'
                    placeholder='Primary Address'
                    value={basicAddress.primary} 
                    onChange={(e)=>setBasicAddress({...basicAddress, primary: e.target.value})} 
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6} >
                <Grid item xs={6} lg={4}>
                  <input 
                    name='secondary_address' 
                    type='text'
                    placeholder='Secondary'
                    value={basicAddress.secondary} 
                    onChange={(e)=>setBasicAddress({...basicAddress, secondary: e.target.value})} 
                  />
                </Grid>
                <Grid item xs={6} lg={4}>
                  <input 
                    name='zip_code' 
                    type='text'
                    placeholder='Zip Code'
                    value={basicAddress.zipCode} 
                    onChange={(e)=>setBasicAddress({...basicAddress, zipCode: e.target.value})} 
                  />
                </Grid>
              </Grid>
              <Grid container justify='center' spacing={4}>
                <Grid item xs={10} md={8} lg={6}>
                  <button>Let's Go</button>
                </Grid>
              </Grid>
            </div>      
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreateSpacePage;
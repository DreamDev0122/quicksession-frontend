import Head from 'next/head'
import styles from '../styles/Register.module.scss';
import clsx from 'clsx';
import FormInputComponent from '../components/FormControls/FormInputComponent';
import { useState } from 'react';
import { Grid, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FormButtonComponent from '../components/FormControls/FormButtonComponent';
import FormForget from '../components/FormControls/FormForget';
import { login } from "../services";
import { withRouter } from 'next/router'
import { useRouter } from "next/router";

import { validateEmail } from '../utils/validation';
import { useAlert } from 'react-alert';

const RegisterPage = () => {
  const router = useRouter();
  const query = router.query

  console.log("----- props", query);
  const alert = useAlert();

  const [role, setRole] = useState(query.role || "artist");

  const [loginInfo, setLoginInfo] = useState({
    email: '', 
    password: '',
  });
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setIsInvalid({
      ...isInvalid,
      email: false
    });
    setLoginInfo({ ...loginInfo, email: e.target.value});
  }

  const submitLogin = async (e) => {
    if (isLoading)
      return;

    e.preventDefault();

    if (!validateEmail(loginInfo.email)) {
      setIsInvalid({
        ...isInvalid,
        email: true
      });
      return;
    }


    setIsLoading(true);
    try {      
      const result = await login(loginInfo);
      setIsLoading(false);
      result?.token && router.push("/")
    } catch (e) {
      setIsLoading(false);
      alert.error(e.message);
    }
  };

  return (
    <div className={styles.container}>
      
      <Head>
        <title>Sign into QuikSession</title>
      </Head>
      <h1>WELCOME TO QUIKSESSION</h1>
      <p className={styles.p30}>Ready to Log in?</p>

      <div className={styles.formWrapper}>        
        <div className={clsx(styles.imgBG, styles.left)}></div>
        <div className={clsx(styles.imgBG, styles.right)}></div>
        <form onSubmit={submitLogin} className={styles.signUpForm}>
          <div className={styles.imgWrapper}>
            <img className={styles.backImg} src='/assets/imgs/formBG1.jpg' alt='signUpForm' />
            <div className={styles.contentWrapper}>
              <Grid container justify='center' spacing={2}>           
                <Grid item xs={12} sm={10}>
                  <FormInputComponent 
                    placeholder='Email' 
                    name='email' 
                    type='email'
                    value={loginInfo.email}
                    handleChange = {(event) => {handleEmailChange(event)}}
                    isInvalid={isInvalid.email}
                    kind='login'
                    required
                  />  
                </Grid>
              </Grid>
             
              <Grid container justify='center' spacing={2} className={styles.mt30}>
                <Grid item xs={12} sm={10}>                  
                  <FormInputComponent 
                    placeholder='Password' 
                    name='password' 
                    type='password'
                    value={loginInfo.password}
                    handleChange = {(event) => setLoginInfo({ ...loginInfo, password: event.target.value})}
                    isInvalid={isInvalid.password}
                    kind='login'
                    required
                  />
                </Grid>         
              </Grid>

              <Grid container justify='center' spacing={2}>
                <Grid item xs={12} md={6}>
                  <RadioGroup
                    className={styles.aroundAlign}
                    aria-label="role"
                    name="role"
                    row
                    value={role}
                    onChange={(e) => {
                      setRole(e.currentTarget.value);
                    }}
                  >
                    <FormControlLabel                              
                      value="owner"
                      control={<Radio />}
                      label={<h4>Owner</h4>}
                    />
                    <FormControlLabel                      
                      value="artist"
                      control={<Radio />}
                      label={<h4>Artist</h4>}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Grid container justify='center' spacing={2}>               
                <Grid item xs={12} md={11}>
                  <FormForget />
                </Grid>             
              </Grid>
              
              <Grid container justify='center' spacing={2} className={styles.mt30}>               
                <Grid item xs={12} md={5}>
                  <FormButtonComponent type="submit" isLoading={isLoading} title='Log In'/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormButtonComponent type="button" isGoogle={true} title='Continue with' onClickFunc={()=>router.push("/auth/google")}/>
                </Grid>       
              </Grid>
            </div>
          </div>
        </form>      
      </div>
    
    </div>
  )
}

export default RegisterPage;

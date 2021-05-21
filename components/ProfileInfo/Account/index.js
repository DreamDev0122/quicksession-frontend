import React, { useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { Grid } from '@material-ui/core';
import FormAddImage from '../../FormControls/FormAddImage';
import { Storage } from 'aws-amplify';
import { LOAD_PAGE } from '../../../states/types';
import { Context } from '../../../states/context';

const ProfileAccountSection = (props) => {

  // const { dispatch, state } = useContext(Context);

  const [profileInfo, setProfileInfo] = useState({
    fistName: '',
    lastName: '',
    email: '',
    password: ''
  }); 

  const [logoImg, setLogoImg] = useState(null);
  const [photoImg, setPhotoImg] = useState(null); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    user?.token && setProfileInfo({
      firstName: user.user.name.split(' ')[0].toUpperCase(),
      lastName: user.user.name.split(' ')[1].toUpperCase(),
      email: user.user.email.toUpperCase(),
      password: 'password'
    })
    async function loadPhoto(url) {
      // console.log("BEFORE State=--", state);
      // dispatch({ type: LOAD_PAGE, payload: true });
      // console.log("AFTER State=--", state);
      setPhotoImg(await Storage.get(url));
      // dispatch({ type: LOAD_PAGE, payload: false });
      // console.log("FINAL State=--", state);
    }
    user?.user?.userPhoto && loadPhoto(user.user.userPhoto)
  }, []);

  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false
  });

  const handleEmailChange = (e) => {
    setIsInvalid({
      ...isInvalid,
      email: false
    });
    setProfileInfo({ ...profileInfo, email: e.target.value});
  }

  return(
    <div className={styles.container}>
      <Grid container justify='center' spacing={6}>
        <Grid item xs={6} md={4} lg={2} className={styles.infoWrapper}>
          <label><i>FIRST</i></label>
          <input            
            placeholder='First' 
            name='first_name' 
            type='text'
            value={profileInfo.firstName}
            onChange = {(event) => setProfileInfo({ ...profileInfo, firstName: event.target.value})} 
            required
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2} className={styles.infoWrapper}>
          <label><i>LAST</i></label>
          <input            
            placeholder='Last' 
            name='last_name' 
            type='text'
            value={profileInfo.lastName}
            onChange = {(event) => setProfileInfo({ ...profileInfo, lastName: event.target.value})} 
            required
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3} className={styles.infoWrapper}>
          <label><i>EMAIL</i></label>
          <input            
            placeholder='Email'
            name='email' 
            type='email'
            isInvalid={isInvalid.email}
            value={profileInfo.email}
            onChange = {(event) => handleEmailChange(event)} 
            required
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3} className={styles.infoWrapper}>
          <label><i>PASSWORD</i></label>
          <input            
            placeholder='Password' 
            name='password' 
            type='password'
            value={profileInfo.password}
            onChange = {(event) => setProfileInfo({ ...profileInfo, password: event.target.value})} 
            required
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2} className={styles.infoWrapper}>
          <button><i>RESET</i></button>
        </Grid>
      </Grid>
      
      <br/>

      <Grid container justify='center' spacing={6} className={styles.mt1}>
        <Grid item xs={12} md={6} className={styles.infoWrapper}>
          <label><i>SOCIALS</i></label>
          <Grid container spacing={4}>
            <Grid item xs={4} className={styles.infoWrapper}>
              <img src='/assets/imgs/icons/instagram.png' alt='instagram'/>
              <div className={styles.socialBottom}/>
            </Grid>
            <Grid item xs={4} className={styles.infoWrapper}>
              <img src='/assets/imgs/icons/twitter.png' alt='twitter'/>
              <div className={styles.socialBottom}/>
            </Grid>
            <Grid item xs={4} className={styles.infoWrapper}>
              <img src='/assets/imgs/icons/linkedin.png' alt='linked'/>
              <div className={styles.socialBottom}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container  spacing={4}>
            <Grid item xs={6} className={styles.infoWrapper}>
              <FormAddImage isSmallSize={true} activeImage={logoImg} setActiveImage={setLogoImg}/>
              <div className={styles.imgBottom}>LOGO</div>
            </Grid>
            <Grid item xs={6} className={styles.infoWrapper}>
              <FormAddImage isSmallSize={true} activeImage={photoImg} setActiveImage={setPhotoImg}/>
              <div className={styles.imgBottom}>PROFILE IMAGE</div>
            </Grid>         
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProfileAccountSection;
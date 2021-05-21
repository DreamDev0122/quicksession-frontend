import React, { useContext, useState, useEffect } from 'react';
import ProfileAccountSection from './Account';
import ProfileSpaces from './Spaces';
import styles from './style.module.scss';

const ProfileInformation = (props) => {
  return(
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        {props.title}
      </div>
      <div className={styles.bannerDiv}>
      </div>
      {
        props.title.toLowerCase() === 'my info' ?
          <ProfileAccountSection />
        :
        props.title.toLowerCase() === 'my spaces' ?
          <ProfileSpaces />
        :
        null
      }
    </div>
  )
}

export default ProfileInformation;
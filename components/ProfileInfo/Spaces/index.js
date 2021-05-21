import React, { useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useRouter } from 'next/router';
import router from '../../../utils/router';

const ProfileSpaces = (props) => {
  const history = useRouter();

  return(
    <div className={styles.container}>
      <button onClick={() => history.push(router.createSpace.path)}>
        <Icon path={mdiPlus} size={1} color={'#fff'}/>
      </button>
    </div>
  )
}

export default ProfileSpaces;
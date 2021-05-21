import React from 'react';
import styles from './style.module.scss';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

const FormButtonComponent = ({title, isLoading, isGoogle, onClickFunc, ...otherProps}) => {

  return(
    <div className={styles.container}>
      <button {...otherProps} onClick={onClickFunc}>
        {
          isLoading && <Icon path={mdiLoading} size={1} color={'#fff'} spin={1} className={styles.spinIcon}/>
        }
        {title}
        {
          isGoogle && <img src='/assets/google.png' alt='google_icon' />
        }
      </button>
    </div>
  )
}

export default FormButtonComponent;
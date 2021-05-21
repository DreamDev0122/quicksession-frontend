import React from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

const FormInputComponent = ({ placeholder, kind, handleChange, isInvalid, ...otherProps }) => {

  return(
    <div className={styles.container}>
      <input
        className={clsx(kind === 'login' ? styles.login : '', isInvalid ? styles.redOut : '')}
        placeholder={placeholder} 
        onChange={handleChange} 
        {...otherProps}
      />
    </div>
  )
}

export default FormInputComponent;
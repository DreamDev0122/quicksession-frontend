import React, { useState } from 'react';
import styles from './style.module.scss';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

const FormAddImage = (props) => {
  
  const {activeImage, setActiveImage, isSmallSize} = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg, .jpeg, .png, .webp, .tiff, .tif, .gif, .svg',
    multiple: false,
    onDrop: acceptedFiles => {
      setActiveImage(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });

  return(
    <div className={styles.container}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />         
        {
          activeImage ? <div className={clsx(styles.wrapper, isSmallSize ? styles.smallSize : '')}>
            <img className={styles.photoImg} src={ isSmallSize ? activeImage : activeImage.preview}/>
            </div>
          :
          <div className={clsx(styles.wrapper, isSmallSize ? styles.smallSize : '')}>
            {!isSmallSize && <label>Add Image</label>}
            <Icon
              path={mdiPlus}
              size={1.5}
              color={'#FFF'}
              className={styles.addIcon}
            /> 
          </div>
        }
      </div>  
    </div>
   
  )
}

export default FormAddImage;
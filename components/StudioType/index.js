import React, { useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';

const StudioType = (props) => {
  return(
    <div className={styles.container}>
      <div onClick={() => props.setStudioType('music')} className={styles.type}>
        Find a Music Studio
      </div>
      |
      <div onClick={() => props.setStudioType('film')} className={styles.type}>
        Find a Filming/Photography Studio
      </div>
      |
      <div onClick={() => props.setStudioType('dj')} className={styles.type}>
        Find a DJ
      </div>
      {/* |
      <div className={styles.add}>
        Add Studio <Icon
					path={mdiMenuDown }
					size={1}
					color={'#FFF'}
				/>
      </div> */}
    </div>
  )
}

export default StudioType;
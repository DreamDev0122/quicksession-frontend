import React from 'react';
import styles from './style.module.scss';

const DeskListMapToggle = (props) => {
  return(
    <div className={styles.container}>
      <div onClick={() => props.changeActiveView('list')} className={styles.buttonView + ((props.activeView === 'list') ? (' ' + styles.active) : '')}> 
      <p>
        LIST VIEW
      </p>
       </div>
      <div onClick={() => props.changeActiveView('map')} className={styles.buttonView + ((props.activeView === 'map') ? (' ' + styles.active) : '')}> 
      <p>
        MAP VIEW
      </p>
       </div>
    </div>
  )
}

export default DeskListMapToggle;
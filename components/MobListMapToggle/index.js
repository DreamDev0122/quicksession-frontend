import React from 'react';
import styles from './style.module.scss';

const MobListMapToggle = (props) => {
  return(
    <div className={styles.container}>
      <div onClick={() => props.changeActiveView('map')} className={((props.activeView === 'map') ? (styles.active) : '')}> MAP VIEW </div>
      <div onClick={() => props.changeActiveView('list')} className={((props.activeView === 'list') ? (styles.active) : '')}> LIST VIEW </div>
    </div>
  )
}

export default MobListMapToggle;
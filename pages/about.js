import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss';

const AboutPage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>About of QuikSession</title>
      </Head>
      <h1>This is About Page</h1>
    </div>
  )
}

export default AboutPage;
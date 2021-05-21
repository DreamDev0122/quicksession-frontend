import Head from 'next/head'
import styles from '../styles/Home.module.scss';

const SettingsPage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Settings of QuikSession</title>
      </Head>
      <h1>This is Settings Page</h1>
    </div>
  )
}

export default SettingsPage;
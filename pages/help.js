import Head from 'next/head'
import styles from '../styles/Home.module.scss';

const HelpPage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Help of QuikSession</title>
      </Head>
      <h1>This is Help Page</h1>
    </div>
  )
}

export default HelpPage;
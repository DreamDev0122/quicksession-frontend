import Head from 'next/head'
import styles from '../styles/Home.module.scss';

const HostSpacePage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Host Space</title>
      </Head>
      <h1>This is Space Hosting Page</h1>
    </div>
  )
}

export default HostSpacePage;
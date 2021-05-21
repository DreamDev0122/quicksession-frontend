import Head from 'next/head'
import styles from '../styles/Home.module.scss';

const ContactUs = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Contact to QuikSession</title>
      </Head>
      <h1>This is Contact Us Page</h1>
    </div>
  )
}

export default ContactUs;
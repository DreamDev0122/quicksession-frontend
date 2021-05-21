import Head from 'next/head'
import styles from '../../styles/Home.module.scss';

const BookingPage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Booking of QuikSession</title>
      </Head>
      <h1>This is Booking Page</h1>
    </div>
  )
}

export default BookingPage;
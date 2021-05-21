import Head from 'next/head'
import styles from '../../styles/Home.module.scss';

const CalenderPage = () => {
  return (
    <div className={styles.tempPage}>
      <Head>
        <title>Calender of QuikSession</title>
      </Head>
      <h1>This is Calender Page</h1>
    </div>
  )
}

export default CalenderPage;
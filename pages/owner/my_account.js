import Head from 'next/head'
import styles from '../../styles/owner/MyAccount.module.scss';
import { Grid } from '@material-ui/core';
import ProfileInformation from '../../components/ProfileInfo';

const OwnerAccountPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>owner account</title>
      </Head>
      <h1>WELCOME TO <span>QUIK SESSION</span></h1>
      <Grid container justify='center' spacing={2} className={styles.section}>
        <Grid item xs={12} md={10}>
          <ProfileInformation title='MY INFO'/>
        </Grid>
      </Grid>     
      <Grid container justify='center' spacing={2} className={styles.section}>
        <Grid item xs={12} md={10}>
          <ProfileInformation title='MY SPACES'/>
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2} className={styles.section}>
        <Grid item xs={12} md={10}>
          <ProfileInformation title='CALENDER'/>
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2} className={styles.section}>
        <Grid item xs={12} md={10}>
          <ProfileInformation title='REVENUE'/>
        </Grid>
      </Grid>
      <Grid container justify='center' spacing={2} className={styles.section}>
        <Grid item xs={12} md={10}>
          <ProfileInformation title='MY STAFF'/>
        </Grid>
      </Grid>
    </div>
  )
}

export default OwnerAccountPage;
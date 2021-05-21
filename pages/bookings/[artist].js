import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../../styles/Booking.module.scss';
import StudioDetail from "../../components/StudioDetail";
import BookingEdit from "../../components/BookingEdit";
import BookingPreview from "../../components/BookingPreview";
import { getStudio } from "../../services";
import Spinner from 'react-bootstrap/Spinner'


const ArtistPage = () => {
  const router = useRouter()
  const { artist } = router.query
  const [view, setView] = useState('detail');
  const [user, setUser] = useState({});
  const [bookingDetail, setBookingDetail] = useState({});
  const [studioDetail, setStudioDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth()
  }, []);


  const checkAuth = () => {
    if (localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth'))) {
      setUser(JSON.parse(localStorage.getItem('auth')))
      getStudioDetails();
    } else {
      router.push({
        pathname: '/signin'
      });
    }
  };

  const getStudioDetails = async () => {
     try {

       if (artist) {
         const studio = await getStudio(artist);
         setLoading(true);
         setStudioDetail(studio);
         setLoading(false);
       }
     } catch (error) {
       alert(error);
       setLoading(false);
     }
  }

  const changeView = (view, bookingDetail = {}) => {
    setView(view);
    if (bookingDetail) {
      setBookingDetail(bookingDetail);
    }
  };


  return (
    <div>

      <Head>
        <title>About QuikSession</title>
      </Head>
      { loading ? (
            <div className={styles.loadingView}>
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <div>
              <div className={((view === "detail") ? styles.diShow : styles.diHide)}>
                <StudioDetail userDetail={user} studioDetail={studioDetail} changeView={changeView} />
              </div>
              <div className={((view === "edit")) ? styles.diShow : styles.diHide}>
                <BookingEdit userDetail={user} bookingDetail={bookingDetail} studioDetail={studioDetail} changeView={changeView} />
              </div>
              {(view === "preview") ?
                <div className={((view === "preview")) ? styles.diShow : styles.diHide}>
                  <BookingPreview userDetail={user} bookingDetail={bookingDetail} studioDetail={studioDetail} changeView={changeView} />
                </div> : null }
            </div>
          )
      }
    </div>
  )
}

export default ArtistPage;
import React, { useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router'

const DashboardList = (props) => {

  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('auth'))) {
      setUser(JSON.parse(localStorage.getItem('auth')))
    }
  }, []);

  const bookNow = (role) => {
    console.log("user", user);
    if (user && user.token) {
      router.push(`/bookings/${props.listItem.id}`);

    } else {
      router.push({
        pathname: '/signin',
        query: { role }
    });
    }
  }

  const getFormattedAddress = (address) => {
    if (address) {
      var temp = address.split(",");
      return ( `${(temp[temp.length - 2] && temp[temp.length - 2].split(" ")[1] && temp[temp.length - 2].split(" ")[1].trim())}, ${(temp[temp.length - 1] && temp[temp.length - 1].trim())}` )
    } else {
      return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstDiv}>

        <div className={styles.imgContainer}>
        </div>
        { (props.activeView === 'list' || true) ? (
          <>
          <div className={styles.textContent}>
            <h2>
              {props.listItem.name}
            </h2>
            <div className={styles.innerTextContent}>
              <p>
                {props.listItem.description}
              </p>
            </div>
          </div>
          <div className={styles.buttonDiv}>
          <div onClick={() => bookNow('artist')} className={styles.bookContent}>
            <p>
              Book
            </p>
          </div>
          <div onClick={() => bookNow('owner')} className={styles.bookContent}>
            <p>
              Add STudio
            </p>
          </div>
        </div>
        </>
          ) : null }
      </div>
    </div>
  )
}

export default DashboardList;
import Head from 'next/head'
import SearchBar from '../components/SearchBar';
import StudioType from '../components/StudioType';
import DashboardList from '../components/DashboardList';
import DeskListMapToggle from '../components/DeskListMapToggle';
import MobListMapToggle from '../components/MobListMapToggle';
import GeoCoderInput from '../components/geocoder/GeoCoderInput';
import MapView from '../components/MapView';
import Grid from "@material-ui/core/Grid";
import Popup from '../components/Popup/index'
import { fetchStudios } from "../services";
import styles from '../styles/Home.module.scss';
import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePosition } from '../services/usePosition';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from 'react-bootstrap/Spinner'

const pageSize = 4;
let page = 0;
const Home = () => {
  const router = useRouter();
  const [auth, setAuth] = useState();
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [maxPrice, setMaxPrice] = useState(null);
  const [location, setLocation] = useState({});
  const [distance, setDistance] = useState(50);
  const [studioType, setStudioType] = useState(null);
  const [filterData, setFilterData] = useState({});
  const [message, setMessage] = useState("Loading...");
  const [showClearFilterButton, setShowClearFilterButton] = useState(false);

  const [activeView, setActiveView] = useState('list');
  const [openpopup, setopenpopup] = useState(false);

  const setFilterDataUpdated = (filterDataRet) => {
    page = 0;
    setStudios([]);
    setFilterData(filterDataRet);
    if (Object.keys(filterDataRet).length) {
      // reset
      setMinPrice(null);
      setMaxPrice(null);
    }
  };

  const {
    latitude,
    longitude
  } = usePosition();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'));
    setLocation({ latitude, longitude });
    user?.token ? setAuth(user) : null;
    fetchData();
    const shouldShowClearButton = !!minPrice || !!maxPrice;
    setShowClearFilterButton(shouldShowClearButton);
  }, [minPrice, maxPrice, latitude, longitude, distance, filterData, studioType]);

  const getSortInfo = () => {
    if (filterData && Object.keys(filterData).length) {
      const retObj = {};
      if (filterData.query) {
        retObj.search = filterData.query;
      }

      if (filterData.startDate) {
        retObj.startDate = filterData.startDate;
      }
      if (filterData.endDate) {
        retObj.endDate = filterData.endDate;
      }
      if (filterData.sortBy) {
        switch (filterData.sortBy) {
          case "lowToHigh":
            retObj.sortBy = 'price';
            retObj.sortDir = 'asc';
            break;
          case "HighToLow":
            retObj.sortBy = 'price';
            retObj.sortDir = 'desc';
            break;
          case "atoz":
            retObj.sortBy = 'name';
            retObj.sortDir = 'asc';
            break;
          case "ztoa":
            retObj.sortBy = 'name';
            retObj.sortDir = 'desc';
            break;
        }
      }
      return retObj;
    } else {
      return {};
    }
  }

  const fetchData = async () => {
    try {
      if (latitude && longitude) {
        setLoading(true);
        const data = await fetchStudios({ pageSize, pageNumber: page, minPrice, maxPrice, lat: latitude, lng: longitude, distance, type: studioType, ...getSortInfo() });
        setLoading(false);
  
        if (data.length === 0) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
        setStudios(studios.concat(data));
      } else {
        console.error("Please allow location to find studios.");
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const setLocationDistance = (distance) => {
    page = 0;
    setStudios([]);
    setDistance(distance);
  };

  const onStudioTypeChange = (type) => {
    page = 0;
    setStudios([]);
    setStudioType(type);
  }

  const onChangePrice = (min, max) => {
    page = 0;
    setStudios([]);
    setMinPrice(min);
    setMaxPrice(max);
  };

  const loadMoreFun = () => {
    console.log("load more", page);
    if (loadMore) {
      page++;
      // setPageNumber(pageNumber+1);
      fetchData();

    }
  }

  const onDateChange = (date) => {
    console.log("changedDate", date);
    setFilterData({
      startDate: date.startDate,
      endDate: date.endDate,
      ...filterData
    });
  };

  const renderArtist = () => {
    // if (auth?.user?.role === 'owner')
    //   // router.push('/owner/my_account')
    //   router.push('/')
    // else
    return (
      <div className={styles.landing_page}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.dashboardContainer} >

        </div>
        <StudioType setStudioType={(e) => onStudioTypeChange(e)} />

        <SearchBar changeDate={onDateChange} setDistance={(loc) => setLocationDistance(loc)} onChangePrice={(min, max) => onChangePrice(min, max)} />
        <div className={styles.toolBar} >
          <DeskListMapToggle activeView={activeView} changeActiveView={(view) => setActiveView(view)} />
          <button className={`${styles.button}`} onClick={() => setopenpopup(true)}>Advanced Filter </button>
        </div>
          { loading ? (
            <div className={styles.loadingView}>
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
        <div className={styles.bodyWrapper}>
          <div className={styles.img_wrapper + ((activeView === 'map') ? (' ' + styles.mapView) : '')}>

            {studios && studios.length && studios.map((ele) => (
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMoreFun}
                hasMore={loadMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={false}
              >
                <DashboardList listItem={ele} activeView={activeView} />
              </InfiniteScroll>
            ))}
            {studios && studios.length === 0 && (<h2 className={styles.noRecFound} > No Record Found </h2>)}
          </div>
          {
            (activeView === 'map') ? (<MapView studios={studios} selectedStudio={selectedStudio} />) : null
          }

        </div>
        ) }
        { loading ? null : 
        (<MobListMapToggle activeView={activeView} changeActiveView={(view) => setActiveView(view)} />)
        }
        <Popup openpopup={openpopup} setopenpopup={setopenpopup} filterData={filterData} setFilterData={setFilterDataUpdated} >
        </Popup>
      </div>
    )
  }

  return (
    <Fragment>
      {
        // auth && 
        renderArtist()
      }
    </Fragment>
  )


}

export default Home;

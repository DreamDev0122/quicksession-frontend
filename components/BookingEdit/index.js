import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import Head from 'next/head'
import AliceCarousel from 'react-alice-carousel';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import moment from "moment";
import { getBook } from "../../services";
import SelectBox from "../SelectBox";

const addonsTypes = [
  {
    type: 'Smoke Machine',
    price: 30
  },
]

const BookingEdit = (props) => {
  console.log("props", props);
  const [monthList, setMonthList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(props.bookingDetail.selectedMonth);
  const [selectedDate, setSelectedDate] = useState(props.bookingDetail.selectedDate);
  const [startTime, setStartTime] = useState(props.bookingDetail.startTime);
  const [endTime, setEndTime] = useState(props.bookingDetail.endTime);
  const [selectedAdons, setSelectedAdons] = useState(props.bookingDetail.selectedAdons);
  const [allTimeRange, setAllTimeRange] = useState(null);

  useEffect(() => {
    getAllDataRange()
  }, []);

  const getAllDataRange = async () => {
    try {
      setMonthList([]);
      const temp = [];
      for (var i = moment().format("MM"); i <= 12; i++) {
        const tempObj = {
          key: i - 1,
          value: moment().month(i - 1).format("MMM")
        }
        temp.push(tempObj);
      }
      setMonthList(temp);

    } catch (error) {
      alert(error);
    }
  }

  const getDates = (month) => {
    const tempDates = [];
    let startDate = moment().startOf("month").format("DD")

    if (month == moment().format("MM")-1) {
      startDate = moment().format("DD")
    }

    for (var i = startDate; i <= moment().endOf("month").format("DD"); i++) {
      tempDates.push({
        key: moment().date(i).format("DD"),
        value: moment().date(i).format("DD")
      });
    }
    return tempDates;
  }

  const onSelectChange = (type, value) => {
    if (value) {
      switch (type) {
        case "month":
          setSelectedMonth(value);
          setDateList(getDates(value));
          setSelectedDate(null);
        break;
        case "date":
          setStartTime(null);
          setEndTime(null);
          setSelectedDate(value);
          getBookingTime(value);
          break;
        case "startDate":
          setStartTime(value);
          setEndDates(allTimeRange.filter((ele) => (ele.key > value)));
          break;
        case "endDate":
          setEndTime(value);
          break;
      }
    }
  }

  const formatTime = (ele) => {
    if (ele < 10) {
      return `0${ele}:00`;
    } else {
      return `${ele}:00`;
    }
  };

  const getBookingTime = async (date) => {
    try {
      const data = await getBook({
        TaskId: (props.studioDetail && props.studioDetail.room && props.studioDetail.room[0] && props.studioDetail.room[0]._id),
        date: `${selectedMonth}/${date}/${moment().format("YYYY")}`
      });
      console.log(data);
      if (data && data.AArray) {
        const dates = data.AArray.map((ele, i) => ({key: formatTime(i), isVisible: ele})).filter((ele) => (ele.isVisible)).map((ele) => ({ key: ele.key, value: ele.key }))
        setAllTimeRange(dates);
        setStartDates(dates);
      }
    } catch (error) {
      alert(error);
    }
  };

  const previewData = () => {
    if (selectedMonth && selectedDate && startTime && endTime) {
      const date = `${selectedMonth}/${selectedDate}/${moment().format("YYYY")}`;
      const credit = moment.duration(moment(`${date} ${endTime}:00`).diff(moment(`${date} ${startTime}:00`))).asHours();
      console.log(credit, props.studioDetail);
      props.changeView("preview", {
        selectedMonth,
        selectedDate,
        startTime,
        endTime,
        selectedAdons,
        date: `${selectedMonth}/${selectedDate}/${moment().format("YYYY")}`,
        time: `${startTime} - ${endTime}`,
        total: props.studioDetail.price * credit

      })
    } else {
      alert("Please fill all fields first.");
    }
  }

  return (
    <Container className={styles.container_top + " " + styles.div_align_center}>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <h1 style={{ textAlign: 'center', color: 'white' }}>
            YOUR BOOKING</h1>
        </div>
      </div>

      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <label style={{ textAlign: 'center', color: '#308AB4', fontSize: '1em' }}>
          { (props.studioDetail && props.studioDetail.address) }
          </label>
        </div>
      </div>

      <div className='row' style={{ marginTop: '5%' }}>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'>
          <div>
            <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
              SELECT A DATE
            </label>
          </div>
          <div className={'row' + " " + styles.justify_content} >
            <div className={styles.margingspace}>
              <SelectBox onSelectChange={onSelectChange} type="month" list={monthList} selectedValue={selectedMonth} title="MONTH" />
            </div>
            <div style={{ marginTop: '5%' }}>
              <p>
                To
            </p>
            </div>
            <div className={styles.margingspace}>
              <SelectBox onSelectChange={onSelectChange} type="date" list={dateList} selectedValue={selectedDate} title="DAY" />
            </div>
          </div>
        </div>
        <div className='col-sm-6	col-md-6	col-lg-6	col-xl-6'>
          <div>
            <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
              SELECT A TIME
            </label>
          </div>
          <div className={'row' + " " + styles.justify_content} >
            <div className={styles.margingspace}>
              <SelectBox onSelectChange={onSelectChange} type="startDate" list={startDates} selectedValue={startTime} title="TIME" />
            </div>
            <div style={{ marginTop: '5%' }}>
              <label style={{ textAlign: 'center', color: 'white', fontSize: '1.2em' }}>
                To
            </label>
            </div>
            <div className={styles.margingspace}>
              <SelectBox onSelectChange={onSelectChange} type="endDate" list={endDates} selectedValue={endTime} title="TIME" />
            </div>
          </div>
        </div>

      </div>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
          <label className={'btn' + " " + styles.btnstyle} style={{ textAlign: 'center', color: 'white', fontSize: '1.2em', marginTop: '5%' }}>
            Add Ons
            </label>
        </div>
      </div>
      <div className={styles.adonTableDiv} >
        <table className={styles.adonTable}>
            <tr>
              <td className={styles.tableHeading}>
                Type
              </td>
              <td className={styles.tableHeading}>
                Price
              </td>
              <td className={styles.tableHeading}>
                Action
              </td>
            </tr>
            {
              addonsTypes.map((ele) => (
                <tr>
                  <td className={styles.table_col}> {ele.type} </td>
                  <td className={styles.table_col}> ${ele.price} </td>
                  <td className={styles.table_col}> 
                    <label className={'btn' + " " + styles.btnstyle} >
                      ADD
                    </label>  
                  </td>
                </tr>
              ))
            }
        </table>
      </div>
      <div className='row' >
        <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>

          <Button size="lg" style={{ backgroundColor: '#308AB4', border: 'none', marginTop: '5%' }} onClick={() => previewData()}>
            Review
        </Button>

        </div>
      </div>
    </Container>


  )
}

export default BookingEdit;
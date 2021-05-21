import React, { useContext, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import styles from './style.module.scss';
import RangeSelectButton from '../popover/RangeSelectButton';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const locations = [
  {
    label: '25',
    value: 25
  },
  {
    label: '50',
    value: 50
  },
  {
    label: '75',
    value: 75
  },
  {
    label: '100',
    value: 100
  },
  {
    label: '125',
    value: 125
  },
  {
    label: '150',
    value: 150
  },
  {
    label: '175',
    value: 175
  },
  {
    label: '200',
    value: 200
  },
  {
    label: 'Over 200',
    value: '200+'
  },
]

const parseRange = (min, max) => {
  let minVal = null;
  let maxVal = null;
  minVal = parseInt(min);
  maxVal = parseInt(max);
  if (isNaN(minVal) || minVal < 0) {
    minVal = null;
  }

  if (isNaN(maxVal) || maxVal < 0) {
    maxVal = null;
  }

  if (minVal && maxVal && minVal > maxVal) {
    minVal = null;
    maxVal = null;
  }

  return [minVal && String(minVal), maxVal && String(maxVal)];
};

const SearchBar = (props) => {
  const [distance, setDistance] = useState(50);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(1, 'd'));
 

  const selectChanged = (data) => {
    props.setDistance(data);
    setDistance(data);
    console.log("select", data);
  }

  const onDateChange = (event, picker) => {
    console.log("date", picker.startDate.format("YYYY-MM-DD"));
    setStartDate(picker.startDate.format("YYYY-MM-DD"));
    setStartDate(picker.endDate.format("YYYY-MM-DD"));
    props.changeDate({startDate: picker.startDate.format("YYYY-MM-DD"), endDate: picker.endDate.format("YYYY-MM-DD")});
  };

  const onChangePrice = (min, max) => {
    const [minVal, maxVal] = parseRange(min, max);
    setMinPrice(minVal);
    setMaxPrice(maxVal);
    props.onChangePrice(minVal, maxVal);
  };
  return (
    <div className={styles.container}>

      <div className={styles.dskContainer}>

        <div className={styles.column + ' ' + styles.column1}>
          <p><b>Location</b></p>
          <Form.Group
            className={styles.datePick}
          >
            <Form.Control as="select"
              value={distance}
              onChange={(e) => selectChanged(e.target.value)}
            >
              {locations.map((ele) => (<option value={ele.value} >{ele.label}</option>))}
            </Form.Control>
          </Form.Group>
        </div>

        <div className={styles.column}>
          <p><b>Date</b></p>
          <DateRangePicker
          onApply={onDateChange}
            initialSettings={{ startDate: '1/1/2014', endDate: '3/1/2014' }}
          >
            <button className={`${styles.datePick} ${styles.selectDate}`}>Select Date</button>
          </DateRangePicker>
        </div>
        <div className={styles.column}>
          <p><b>Price</b></p>
          <RangeSelectButton
            className={styles.datePick}
            min={minPrice}
            max={maxPrice}
            defaultText="Select price"
            prefix="$"
            onChange={(min, max) => onChangePrice(min, max)}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar;
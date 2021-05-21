import React, { useState } from 'react'
import styles from './style.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  scrollPaper: {
    alignItems: 'baseline'
  },
  dialog: {
    position: 'fixed',
    left: "25%",
    top: "20%",
    width: "800px",
    [theme.breakpoints.down('sm')]: {
      left: "5%",
      top: "20%",
      width: "800px",
    },
    [theme.breakpoints.down('xs')]: {
      left: "0%",
      top: "20%",
      width: "92%",
      margin: "16px"
    },
  }
}));
function Popup(props) {
  const { title, children, openpopup, setopenpopup, filterData, setFilterData } = props;
  const [sortBy, setSortBy] = useState(filterData.sortBy || 'atoz');
  const [query, setQuery] = useState(filterData.query || '');
  const options = [
    { value: 'lowToHigh', label: 'Low to High' },
    { value: 'HighToLow', label: 'High to Low' },
    { value: 'atoz', label: 'A to Z' },
    { value: 'ztoa', label: 'Z to A' }
  ]

  const clear = () => {
    setFilterData({});
    setopenpopup(false);
  };

  const search = () => {
    setFilterData({
      sortBy,
      query
    });
    setopenpopup(false);
  };

  const selectChanged = (data) => {
    setSortBy(data);
    console.log("select", data);
  }

  const onSearchChange = (e) => {
    setQuery(e);
  }

  const classes = useStyles();

  return (
    <div className={styles.all}>
      <Dialog className={styles.dia}
      contentStyle={{maxWidth: 300}}
       classes={{
        paper: classes.dialog,
        scrollPaper: classes.scrollPaper
      }} open={openpopup}>
        <div className={styles.popup}>
          <div className={styles.title} >Advanced filter </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Relevance</Form.Label>
            <Form.Control
              value={query}
              onChange={(e) => onSearchChange(e.target.value)}
              type="text"
              placeholder="Search" />
          </Form.Group>
          <Form.Group className={styles.datePick} >
            <Form.Label>Others</Form.Label>

            <Form.Control as="select"
              value={sortBy}
              onChange={(e) => selectChanged(e.target.value)}
            >
              {options.map((ele) => (<option value={ele.value} >{ele.label}</option>))}
            </Form.Control>
          </Form.Group>
          <br />
          <div className={styles.footer}>
            <div  className={styles.check} >
              <Button onClick={() => clear()} className={styles.button}>Clear</Button>
            </div>
            <div className={styles.search} >
              <Button onClick={() => search()} className={styles.button}>Search</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>

  )
}

export default Popup

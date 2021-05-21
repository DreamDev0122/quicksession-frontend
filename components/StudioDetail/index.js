import React, { useState } from 'react';
import styles from './style.module.scss';
import Head from 'next/head'
import AliceCarousel from 'react-alice-carousel';
import { useRouter } from 'next/router'
import { CardContent, Container, Grid, Typography, Chip } from '@material-ui/core';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'


const StudioDetail = (props) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slideTo = (i) => {
    console.log("changing to - ", i);
    setCurrentIndex(i)
  };


  const renderThumbs = () =>
  <div className={styles.thumbContainer} >
    {items.map((item, i) =>
    <div className={styles.thumbItem} key={i} onClick={() => slideTo(i)}>{item}</div>)}
  </div>;

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img src="/assets/imgs/others1.jpg" onDragStart={handleDragStart} className={styles.slideImg} />,
    <img src="/assets/imgs/others2.jpg" onDragStart={handleDragStart} className={styles.slideImg} />,
    <img src="/assets/imgs/others3.jpg" onDragStart={handleDragStart} className={styles.slideImg} />,
    <img src="/assets/imgs/others4.jpg" onDragStart={handleDragStart} className={styles.slideImg} />,
    <img src="/assets/imgs/others5.jpg" onDragStart={handleDragStart} className={styles.slideImg} />,
  ];
  

  
  return(
    <Container className={styles.container_top}>
    <div className='row' >
      <div className='col-sm-5	col-md-5	col-lg-5	col-xl-5'>
        { renderThumbs() }
        <AliceCarousel disableButtonsControls activeIndex={currentIndex} items={items}>
        </AliceCarousel>
      </div>
      <div className={'col-sm-5	col-md-5	col-lg-5	col-xl-5 ' + styles.main_div}  >
        <div className={'row' + styles.div_align_center} >
          <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
            <label style={{ textAlign: 'center', color: 'white', fontSize: '30px', marginTop: '5%' }}>
              { (props.studioDetail && props.studioDetail.name) }  
            </label>
          </div>
        </div>
        <div className='row'>
          <label style={{ textAlign: 'center', color: '#1B7098', marginTop: '2%' }}>
          { (props.studioDetail && props.studioDetail.address) }
          </label>

        </div>
        <div className='row' style={{ marginTop: '2%', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              height: 40,
              width: 40,
              borderRadius: 360,
              backgroundColor: '#308AB4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div
            style={{
              position: 'relative',
              left: 10,
              height: 40,
              width: 40,
              borderRadius: 360,
              backgroundColor: '#308AB4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
        <div className='row' style={{ textAlign: 'center' }}>
          <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
            <label style={{ color: 'white', fontSize: '22px', marginTop: '2%' }}>
              About
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12	col-sm-12	col-md-12	col-lg-12'>
            <label style={{ textAlign: 'left', color: '#1B7098', marginTop: '2%' }}>
            { (props.studioDetail && props.studioDetail.description) }
            </label>
          </div>
        </div>

      </div>
    </div>
    <div className='row' style={{ marginTop: 50 }}>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4' style={{ textAlign: 'center' }}>
        <label style={{ fontSize: '1.5em', color: 'white', margin: '3%' }}>RATE = ${ (props.studioDetail && props.studioDetail.price) }/HOUR
          </label>
      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4' style={{ textAlign: 'center' }}>
        <Dropdown >
          <Dropdown.Toggle split style={{ backgroundColor: '#308AB4' }} >
            1 HOUR
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: '#1B7098', borderColor: 'none' }}>
            <Dropdown.Item href="#/action-1">1 Hr</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
      <div className='col-sm-4	col-md-4	col-lg-4	col-xl-4' style={{ textAlign: 'center' }}>
        <Button style={{ backgroundColor: '#313131', border: 'none', margin: '3%' }} onClick={() => props.changeView("edit")} >
          Book
      </Button></div>
    </div>

  </Container>

  )
}

export default StudioDetail;
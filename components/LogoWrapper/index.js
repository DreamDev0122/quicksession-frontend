import Head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import styles from './style.module.scss';
import router from '../../utils/router';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiSortVariant, mdiCloseThick  } from '@mdi/js';

const LogoWrapper = (props) => {

	const [auth, setAuth] = useState();
	
	const [isShowSideBar, setIsShowSideBar] = useState(false); 

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('auth'));
		user?.token && setAuth(user);
	}, []);

	return (
		<div className={styles.container}>	
			<div className={styles.logoWrapper}>
				<Link href={router.home.path}>
					<img src="/assets/logo.png" alt="Logo"/>
				</Link>
			</div>		
			{
				auth && !isShowSideBar && <Icon
					path={mdiSortVariant}
					size={3}
					color={'#FFF'}
					className={styles.menuIcon}
					onClick={() => setIsShowSideBar(true)}
				/>
			}
			{
				auth && isShowSideBar && <div className={styles.sideBar}>
					<div>
						<Link href={router.ownerAccount.path}>
							<a>My account</a>
						</Link>
						<Link href={router.calender.path}>
							<a>My calender</a>
						</Link>
						<Link href={router.booking.path}>
							<a>My bookings</a>
						</Link>
					</div>

					<div>
						<Link href={router.settings.path}>
							<a>Settings</a>
						</Link>
						<Link href={router.help.path}>
							<a>Help</a>
						</Link>
					
					</div>
					<Icon
						path={mdiCloseThick}
						size={2}
						color={'#FFF'}
						className={styles.closeIcon}
						onClick={() => setIsShowSideBar(false)}
					/>
					</div>
			}			
		</div>
	)
}
  
export default LogoWrapper;
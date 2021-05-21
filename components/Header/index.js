import Head from 'next/head';
import Link from 'next/link'; 
import React, { useContext, useState, useEffect, Fragment } from 'react';
import styles from './style.module.scss';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import router from '../../utils/router';
import clsx from 'clsx';
import { Storage } from 'aws-amplify';
import { logout, stripeLink } from '../../services';
import { useRouter } from 'next/router';

const Header = (props) => {

	const history = useRouter();

	const [auth, setAuth] = useState();
	const [userPhoto, setUserPhoto] = useState();

	useEffect(() => {
		async function loadPhoto(url) {
			setUserPhoto(await Storage.get(url));
		}
		const user = JSON.parse(localStorage.getItem('auth'));
		if (user?.token) {
			setAuth(user);
			loadPhoto(user.user.userPhoto);
		}
	}, []);

	const [isShowMenu, setIsShowMenu] = useState(false);

	const handleStripeLink = async () => {
    const req = await stripeLink({ userId: auth.user.id });
    window.open(req.url);
	}

	const handleLogout = () => {
		logout();
		history.push(router.home.path);
	}

	return (
		<div className={clsx(styles.container, isShowMenu ? styles.opend : '')}>
			<div className={styles.wrapper} onClick={() => setIsShowMenu(!isShowMenu)}>
				<Icon
					path={mdiMenu}
					size={1}
					color={'#3c3c3c'}
				/>
				{
					userPhoto ? 
						<img src={userPhoto} alt={auth?.user?.name}/>
					:
					<Icon
						path={mdiAccountCircle}
						size={1.5}
						color={'#3c3c3c'}
					/>
				}
			</div>
			{
				isShowMenu && <div className={styles.menuWrapper}>
					{
						auth ?
						<Fragment>
							<div onClick={handleStripeLink}>
								<a>Stripe <span><i>(payments)</i></span></a>
							</div>
							<div onClick={handleLogout}>
								<a>Log Out</a>
							</div>
						</Fragment>
						:
						<Fragment>
							<Link href={router.register.path}>
								<a>Sign up</a>
							</Link>
							<Link href={router.signin.path}>
								<a>Log in</a>
							</Link>
						</Fragment>						
					}
					<hr/>
					<Link href={router.hostSpace.path}>
						<a>Host a space</a>
					</Link>
					<Link href={router.contactUs.path}>
						<a>Contact us</a>
					</Link>
				</div>
			}
		</div>
	)
}
  
export default Header;
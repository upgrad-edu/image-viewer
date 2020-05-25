import React from 'react';
import styles from './Header.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<span className={styles.logo}>Image Viewer</span>
		</div>
	)
}

export default Header;

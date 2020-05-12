import React from 'react';
import styles from './styles.module.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<span className={styles.header__logotext}>Image Viewer</span>
		</div>
	)
}

export default Header;
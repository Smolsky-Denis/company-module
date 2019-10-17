import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';

const Footer = (props) => {
    return(
        <footer className={styles}>
          <nav className="navbar navbar-light bg-color">
            <a href='#'>information link</a>
          </nav>
        </footer>
    )
};

export default Footer

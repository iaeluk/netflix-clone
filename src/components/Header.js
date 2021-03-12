import React from 'react';
import './Header.css';
/*import NetflixLogo from './components/img/logo.png';
import NetflixUser from './components/img/user.png';*/


export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"></img>
                </a>
            </div>
        </header>
    );
}
import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2024 &copy; Jatin</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.linkedin.com/in/jatin-kumar-a78405184/">LinkedIn</a>
        <a href="https://github.com/jk36236">Github</a>
        <a href="https://twitter.com/JatinKalia15">Twitter</a>
      </div>

    </footer>
  );
}

export default Footer
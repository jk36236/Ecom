import './App.css';
import Header from './component/layout/Header/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer';


function App() {
  //downloading font before page load
  React.useEffect(()=>{
   WebFont.load({
    google:{
    families:["Roboto","Droid Sans","Chilanka"]
    }
   })
  },[]);

  return (
    <Router>
     <Header />
     <Footer />
    </Router>
   
  );
}

export default App;

import './Main.css';

import { useRef } from 'react';

import Promo from '../Promo/Promo';
import Header from '../Header/Header';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

export default function Main() {

  const aboutProjectRef = useRef();
  const handlePromoButtonClick = () => aboutProjectRef.current.scrollIntoView({ behavior: 'smooth' });
  
  return (
    <div className="main">
      <div className="main__header">
        <Header/>
        <Promo onButtonClick={handlePromoButtonClick}/>
      </div>
      <AboutProject refAbout={aboutProjectRef}/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </div>
  );
}

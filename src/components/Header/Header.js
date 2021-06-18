import './Header.css'
import logo from '../../images/logo.svg';
import navTabIcon from '../../images/navtab-icon.svg';

import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';
import { CurrentUserContext, CurrentWidthContext } from '../../utils/contexts';

export default function Header() {

  const user = useContext(CurrentUserContext);
  const width = useContext(CurrentWidthContext);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="header">
      <button  className = "header__home"onClick={() => history.push('/')}>
        <img className="header__home__logo" src={logo} alt="Логотип"/>
      </button>
      {
        !user.name ?
        <div className="header__buttons">
          <button className="header__buttons__signup" onClick={() => history.push('/signup')}>Регистрация</button>
          <button className="header__buttons__login" onClick={() => history.push('/signin')}>Войти</button>
        </div> :
        width >768 ?
        <Navigation/> :
        <button className = "header__tab"onClick={() => setIsOpen(true)}>
          <img className="header__tab__icon"src={navTabIcon} alt="Навигационное меню"/>
        </button>
      }
    </div>
    { width <= 768 && 
        <NavTab isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    }
    </>
  );
}

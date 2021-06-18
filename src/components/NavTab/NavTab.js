import './NavTab.css';

import closeNav from '../../images/close-nav.svg';
import icon from '../../images/icon_main.svg';

import { useHistory, useLocation } from 'react-router-dom';

export default function NavTab({ isOpen, onClose }) {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleClick = (evt) => {
    onClose();
    switch (evt.target.name) {
      case 'main':
        return history.push('/');
      case 'movies':
        return history.push('/movies');
      case 'saved-movies':
        return history.push('/saved-movies');
      case 'profile':
        return history.push('/profile');
      default:
        return;
    }
  }
  return (
    <div className = {'navtab' + (isOpen ? ' navtab--opened' : '')}>
      <div className = "navtab__window">
        <button className = "navtab__window__close" onClick={handleClick}><img src={closeNav} alt="закрыть"/></button>
        <ul className = "navtab__window__list">
          <li className= "navtab__window__list__item">
            <button
            className={'navtab__window__list__link' + (pathname === '/' ? ' navtab__window__list__link--active': '')}
            name="main"
            onClick={handleClick}>
            Главная</button>
          </li>
          <li className= "navtab__window__list__item">
            <button className={'navtab__window__list__link' + (pathname === '/movies' ? ' navtab__window__list__link--active': '')}
            name="movies"
            onClick={handleClick}>
            Фильмы</button>
          </li>
          <li className= "navtab__window__list__item">
            <button className={'navtab__window__list__link' + (pathname === '/saved-movies' ? ' navtab__window__list__link--active': '')}
            name="saved-movies"
            onClick={handleClick}>
            Сохраненные фильмы</button>
          </li>
        </ul>
        <button className="navtab__window__account" name="profile" onClick={handleClick}>
          Аккаунт
          <img className="navtab__window__account__icon"src={icon} alt="Иконка"/>
        </button>
      </div>
    </div>
  );
}
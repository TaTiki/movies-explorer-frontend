import './NavTab.css';

import closeNav from '../../images/close-nav.svg';
import icon from '../../images/icon_main.svg';

import { Link, useHistory } from 'react-router-dom';

export default function NavTab({ isOpen, onClose }) {
  const history = useHistory();
  return (
    <div className = {'navtab' + (isOpen ? ' navtab--opened' : '')}>
      <div className = "navtab__window">
        <button className = "navtab__window__close" onClick={onClose}><img src={closeNav} alt="закрыть"/></button>
        <ul className = "navtab__window__list">
          <li className= "navtab__window__list__item"><Link className = "navtab__window__list__link" to='/'>Главная</Link></li>
          <li className= "navtab__window__list__item"><Link className = "navtab__window__list__link navtab__window__list__link--active" to='/movies'>Фильмы</Link></li>
          <li className= "navtab__window__list__item"><Link className = "navtab__window__list__link" to='saved-movies'>Сохраненные фильмы</Link></li>
        </ul>
        <button className="navtab__window__account" onClick={() => history.push('/profile')}>
        Аккаунт
        <img className="navtab__window__account__icon"src={icon} alt="Иконка"/>
      </button>
      </div>
    </div>
  );
}
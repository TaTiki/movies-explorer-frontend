import './Navigation.css';
import icon from '../../images/icon_main.svg';

import { useHistory } from 'react-router-dom';

export default function Navigation() {
  const history = useHistory();
  return ( 
    <div className="navigation">
      <button className="navigation__register" onClick={() => history.push('/movies')}>Фильмы</button>
      <button className="navigation__register" onClick={() => history.push('/saved-movies')}>Сoхраненные фильмы</button>
      <button className="navigation__account" onClick={() => history.push('/profile')}>
        Аккаунт
        <img className="navigation__icon"src={icon} alt="Иконка"/>
      </button>
    </div>
  );
}
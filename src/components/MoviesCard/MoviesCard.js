import './MoviesCard.css';

import redButton from '../../images/redbutton.svg'
import xIcon from '../../images/x.svg';

const baseUrl = 'https://api.nomoreparties.co';

export default function MoviesCard({ film }) {
  return (
    <div className = "moviescard">
      <div className = "moviescard__info">
        <p className = "moviescard__info__title">{film.nameRU}</p>
        <p className = "moviescard__info__duration">{`${film.duration} минут`}</p>
      </div>
      <img className = "moviescard__poster" src={`${baseUrl}${film.image.url}`} alt={film.nameRU}/>
      <div className = "moviescard__state">
        {
          film.state === 0 ?
          <img src={redButton} alt="галочка"/> : film.state === 1 ?
          <button className="moviescard__state__button" onClick={() => alert('not implemented')}>Сохранить</button> :
          <button className="moviescard__state__button" onClick={() => alert('not implemented')}><img src={xIcon} alt="удалить"/></button>
        }
      </div>
    </div>
  );
}

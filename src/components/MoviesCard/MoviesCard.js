import './MoviesCard.css';

import redButton from '../../images/redbutton.svg'
import xIcon from '../../images/x.svg';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function MoviesCard({ film, addFilm, removeFilm }) {

  const history = useHistory();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleAddFilm = () => {
    const filmToAdd = { ...film };
    delete(filmToAdd.state);
    setDisabled(true);
    addFilm(filmToAdd).catch((err)=> {
      if (err) {
        if (err.code === 401) {
          history.push('/signin');
          return;
        }
        if (err.code === 400) {
          setError('фильм не может быть добавлен в базу данных. Выберите другой фильм');
          setTimeout(setError, 2000, '');
          return;
        }
      }
      setError('Что-то пошло не так...');
      setTimeout(setError, 2000, '');
    }).finally(() => setDisabled(false));
  }

  const handleRemoveFilm = () => {
    setDisabled(true);
    removeFilm(film.movieId).catch((err) => {
      if (err) {
        if (err.code === 401) {
          history.push('/signin');
          return;
        }
      }
      setError('Что-то пошло не так...');
      setTimeout(setError, 2000, '');
    }).finally(() => setDisabled(false));
  }

  return (
    <div className = "moviescard">
      <div className = "moviescard__info">
        <p className = "moviescard__info__title">{film.nameRU}</p>
        <p className = "moviescard__info__duration">{`${film.duration} минут`}</p>
      </div>
      <img className = "moviescard__poster" src={film.image} alt={film.nameRU} onClick={() => window.open(film.trailer, "_blank")}/>
      <div className = "moviescard__state">
        {
          film.state === 0 ?
          <button className="moviescard__state__button" onClick={handleRemoveFilm} disabled={disabled}><img className="moviescard__state__button__img" src={redButton} alt="галочка" /></button> : film.state === 1 ?
          <button className="moviescard__state__button" onClick={handleAddFilm} disabled={disabled}>Сохранить</button> :
          <button className="moviescard__state__button" onClick={handleRemoveFilm} disabled={disabled}><img src={xIcon} alt="удалить"/></button>
        }
      </div>
      <span className = "moviescard__state__error">{error}</span>
    </div>
  );
}

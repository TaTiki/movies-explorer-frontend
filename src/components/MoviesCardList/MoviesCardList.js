import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ films, handleShowMore, hideButton, addFilm, removeFilm }) {
  return (
    <div className = "moviecard">
      <div className = "moviecard__list">
        {
          films.map((film) => <MoviesCard key={film.movieId} film={film} addFilm={addFilm} removeFilm={removeFilm}/>)
        }
      </div>
      <button className = {'moviescard__button' + (hideButton ? ' moviescard__button--hidden' : '')} onClick={handleShowMore}>Eщё</button>
    </div>
  );
}
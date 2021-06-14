import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ films }) {
  return (
    <div className = "moviecard">
      <div className = "moviecard__list">
        {
          films.map((film) => <MoviesCard key={film.id} film={film}/>)
        }
      </div>
      <button className = "moviescard__button" onClick={() => alert('not implemented')}>Eщё</button>
    </div>
  );
}
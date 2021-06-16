import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import films from '../../utils/films';

const states = [2, 2, 2, 1, 1, 0, 0, 1, 1, 1, 0, 1];

const filmsWithState = () => films.map((film, idx) => {
  film.state=states[idx];
  return film;
});

export default function SavedMovies() {
  return (
    <>
      <Header/>
      <SearchForm/>
      <MoviesCardList films={filmsWithState().slice(0,3)}/>
      <Footer/>
    </>
  );
}
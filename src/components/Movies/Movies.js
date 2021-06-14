import './Movies.css';

import { useEffect, useState } from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import films from '../../utils/films';

const states = [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1];

const filmsWithState = () => films.map((film, idx) => {
  film.state=states[idx];
  return film;
});

export default function Movies() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    setTimeout(setActive, 3000, false);
  }, []);
  return (
    <>
      <Preloader active={active}/>
      <Header/>
      <SearchForm/>
      <MoviesCardList films={filmsWithState()}/>
      <Footer/>
    </>
  );
}
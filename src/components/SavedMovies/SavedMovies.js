import { useEffect, useState } from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterFilms } from '../../utils/filmHelpers';


export default function SavedMovies({ films, removeFilm }) {

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [short, setShort]= useState(false);

  useEffect(() => {
    const filters = localStorage.getItem('savedMovieFilters');
    if (filters) {
      const { keyword, short } = JSON.parse(filters);
      setKeyword(keyword);
      setShort(short);
    }
  }, []);

  useEffect(() => {
    const filteredFilms = filterFilms(films, { keyword, short });
    setFilteredFilms(filteredFilms);
  }, [keyword, short, films]);

  useEffect(() => {
    if (keyword || short) {
      localStorage.setItem('savedMovieFilters', JSON.stringify({ keyword, short }));
    }
  }, [keyword, short]);
  
  return (
    <>
      <Header/>
      <SearchForm word={keyword} setWord={setKeyword} short={short} setShort={setShort} alwaysEnabled={true}/>
      <MoviesCardList films={filteredFilms} hideButton={true} removeFilm={removeFilm}/>
      <Footer/>
    </>
  );
}
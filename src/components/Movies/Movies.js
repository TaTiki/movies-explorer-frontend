import './Movies.css';

import { useEffect, useState, useContext } from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { CurrentWidthContext } from '../../utils/contexts';

import GetFilms from '../../utils/MoviesApi';
import { apiFilmToFilm, filterFilms } from '../../utils/filmHelpers';

function calcShowMore(width) {
  if (width >= 1280) {
    return {
      initial: 12,
      more: 3,
    }
  }
  if (width >=768) {
    return {
      initial: 8,
      more: 2,
    }
  }
  return {
    initial: 5,
    more: 2,
  }
}

export default function Movies({ myFilms, addFilm, removeFilm }) {

  const width = useContext(CurrentWidthContext);

  const [active, setActive] = useState(false);
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [seenFilms, setSeenFilms] = useState(0);
  const [hideButton, setHideButton] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [short, setShort] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const filters = localStorage.getItem('movieFilters')
    if (filters) {
      const { keyword, short } = JSON.parse(filters);
      setKeyword(keyword);
      setShort(short);
    }
  }, []);

  useEffect(() => {
    if (!keyword) {
      return;
    }
    if (!films.length) {
      const filmsStorage = localStorage.getItem('films');
      if (filmsStorage) {
        return setFilms(JSON.parse(filmsStorage));
      }

      setActive(true);
      GetFilms()
      .then((apiFilms) => {
        const films = apiFilms.map((film) => apiFilmToFilm(film));
        localStorage.setItem('films', JSON.stringify(films));
        setFilms(films);
      }).catch(() => setServerError(true))
      .finally(() => setActive(false));
      return;
    }
    const filteredFilms = filterFilms(films, { keyword, short });
    setFilteredFilms(filteredFilms);
  }, [keyword, short, films]);

  useEffect(() => {
    if (keyword) {
      localStorage.setItem('movieFilters', JSON.stringify({ keyword, short }));
    }
  }, [keyword, short]);

  useEffect(() => {
    const show = calcShowMore(width).initial;
    setSeenFilms(show);
    setHideButton(show >=  filteredFilms.length);
  }, [filteredFilms]);

  const handleShowMore = () => {
    const sum = seenFilms + calcShowMore(width).more;
    setSeenFilms(sum);
    if (sum >= filteredFilms.length) {
      setHideButton(true);
    }
  };

  const renderedFilms = filteredFilms.map((film) => {
    film.state = film.state = myFilms.some((myFilm) => myFilm.movieId === film.movieId) ? 0 : 1
    return film;
  }).slice(0, seenFilms);

  return (
    <>
      <Preloader active={active}/>
      <Header/>
      <SearchForm word={keyword} setWord={setKeyword} short={short} setShort={setShort} alwaysEnabled={false}/>
      {serverError && <span className="movies__notfound">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</span>}
      { keyword && !renderedFilms.length ?
      <span className = "movies__notfound">Ничего не найдено</span> :
      <MoviesCardList films={renderedFilms} handleShowMore={handleShowMore} hideButton={hideButton} addFilm={addFilm} removeFilm={removeFilm}/>
      }
      <Footer/>
    </>
  );
}
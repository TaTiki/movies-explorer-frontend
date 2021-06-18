const base = 'https://api.nomoreparties.co';

function apiFilmToFilm(film) {
  return {
    country: film.country,
    director: film.director,
    duration: film.duration,
    year: film.year,
    description: film.description,
    image: `${base}${film.image.url}`,
    trailer: film.trailerLink,
    thumbnail: `${base}${film.image.formats.thumbnail.url}`,
    movieId: film.id,
    nameRU: film.nameRU,
    nameEN: film.nameEN,
  }
}

function filterFilms(films, { keyword, short }) {
  return films.filter((film) => {
    if (keyword && !film.nameRU.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (short && film.duration > 40) {
      return false;
    }
    return true;
  });
}

export { apiFilmToFilm, filterFilms };
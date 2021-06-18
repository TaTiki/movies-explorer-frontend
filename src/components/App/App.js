import './App.css';

import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext, CurrentWidthContext } from '../../utils/contexts';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function App() {

  const history = useHistory();

  const [width, setWidth] = useState(0);
  const [existError, setExistError] = useState(false);
  const [user, setUser] = useState({});
  const [myFilms, setMyFilms] = useState([]);
  const [JWT, setJWT] = useState('');
  const [finishedInitialChecks, setFinishedInitialChecks] = useState(false);
  const [loadedLocalStorage, setLoadedLocalStorage] = useState(false);

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    if(JWT) {
      setJWT(JWT);
    }
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    setLoadedLocalStorage(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!loadedLocalStorage) {
      return;
    }
    setFinishedInitialChecks(false);
    mainApi.setJWT(JWT);
    if(JWT) {
      handleTokenCheck();
      return;
    }
    setUser({});
    setTimeout(setFinishedInitialChecks,100, true);
  }, [JWT, loadedLocalStorage]);

  const handleRegister = (name, email, password) => {
    return mainApi.register(name, email, password)
    .then(() => {
      mainApi.login(email, password)
      .then((JWT) => {
        setJWT(JWT);
        history.push('/movies');
      }).catch(() => history.push('/signin'));
    });
  };

  const handleLogin = (email, password) => {
    return mainApi.login(email, password)
    .then((JWT) => {
      setJWT(JWT);
    });
  }

  const handleTokenCheck = () => {
    Promise.all([
      mainApi.getUser(),
      mainApi.getMyFilms(),
    ]).then(([user, films]) => {
      setUser(user);
      setMyFilms(films)
      setTimeout(setFinishedInitialChecks,100,true)
      setExistError(false);
    }).catch((err) => {
      if (err && err.code === 401) {
        history.push('/signin')
        setTimeout(setFinishedInitialChecks,100,true);
        setExistError(false);
        return;
      }
      setExistError(true);
    });
  };

  const handleAddFilm = (film) => {
    return mainApi.addFilm(film)
    .then((film) => setMyFilms([film, ...myFilms]));
  };

  const handleRemoveFilm = (movieId) => {
    const entryId = myFilms.filter((film) => film.movieId === movieId)[0]._id;
    return mainApi.removeFilm(entryId)
    .then(() => setMyFilms([...myFilms.filter((film) => film._id !== entryId)]));
  }

  const handleUpdateUser = (email, name) => {
    return mainApi.updateUser(email, name)
    .then((user) => setUser(user));
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('movieFilters');
    localStorage.removeItem('savedMovieFilters');
    setJWT('');
    setUser({});
    history.push('/');
  }

  return (
    <CurrentWidthContext.Provider value={width}>
      <CurrentUserContext.Provider value={user}>
        <div className="app">
          <div className={'app__overlay' + (existError ? ' app__overlay--active' : '')}>
            <div className="app__overlay__content">
              <p>Что-то пошло не так... Попробуте снова.</p>
              <button className="app__overlay__content__button" onClick={handleTokenCheck}>Обновить</button>
            </div>
          </div>
        { finishedInitialChecks &&
        <Switch>
          <Route path="/signin">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path='/signup'>
            <Register handleRegister={handleRegister}/>
          </Route>
          <ProtectedRoute path='/profile'
          component={Profile}
          to='/'
          condition={user._id}
          handleUpdateUser={handleUpdateUser}
          handleSignOut={handleSignOut}/>
          <Route exact path = '/'>
            <Main/>
          </Route>
          <ProtectedRoute path='/movies'
          component={Movies}
          to="/"
          myFilms={myFilms}
          setMyFilms={setMyFilms}
          addFilm={handleAddFilm}
          removeFilm={handleRemoveFilm}
          condition={user._id}/>
          <ProtectedRoute path='/saved-movies' component={SavedMovies} to="/" films={myFilms} removeFilm={handleRemoveFilm} condition={user._id}/>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
        }
        </div>
      </CurrentUserContext.Provider>
    </CurrentWidthContext.Provider>
  );
}

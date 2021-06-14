import './App.css';

import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import Login from '../Login/Login';
import Register from '../Register/Register';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext, CurrentWidthContext } from '../../utils/contexts';

export default function App() {

  const [width, setWidth] = useState();
  const [user, setUser] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setUser(pathname === '/' ? undefined : {});
  }, [pathname])

  return (
    <CurrentWidthContext.Provider value={width}>
      <CurrentUserContext.Provider value={user}>
        <div className="app">
        <Switch>
          <Route path='/signin'>
            <Login/>
          </Route>
          <Route path='/signup'>
            <Register/>
          </Route>
          <Route path = '/profile'>
            <Profile/>
          </Route>
          <Route exact path = '/'>
            <Main/>
          </Route>
          <Route path = '/movies'>
            <Movies/>
          </Route>
          <Route path = '/saved-movies'>
            <SavedMovies/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
        </div>
      </CurrentUserContext.Provider>
    </CurrentWidthContext.Provider>
  );
}

import request from "./request";

function getAuthHeader(JWT) {
  return {
    'Authorization': `Bearer ${JWT}`
  };
}

class MainApi {
  constructor(baseUrl, timeout=20000) {
    this._baseUrl = baseUrl;
    this._timeout = timeout;
  }

  setJWT(JWT) {
    this._JWT = JWT;
  }

  register(name, email, password) {
    return request({
      method: 'POST',
      url: `${this._baseUrl}/signup`,
      body: JSON.stringify({ name, email, password}),
    }).then((resp) => resp.json());
  }

  login(email, password) {
    return request({
      method: 'POST',
      url: `${this._baseUrl}/signin`,
      body: JSON.stringify({email,password})
    }).then((resp) => resp.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('JWT', data.token);
        return data.token;
      }
      return Promise.reject('Что-то пошло не так...')
    });
  }

  getUser() {
    return request({
      method: 'GET',
      url: `${this._baseUrl}/users/me`,
      extraHeaders: getAuthHeader(this._JWT),
    }).then((resp) => resp.json())
  }

  updateUser(email, name) {
    return request({
      method: 'PATCH',
      url: `${this._baseUrl}/users/me`,
      extraHeaders: getAuthHeader(this._JWT),
      body: JSON.stringify({ email, name }),
    }).then((resp) => resp.json())
  }

  getMyFilms() {
    return request({
      method: 'GET',
      url: `${this._baseUrl}/movies`,
      extraHeaders: getAuthHeader(this._JWT),
    }).then((resp) => resp.json())
  }

  addFilm(film) {
    console.log(JSON.stringify(film))
    return request({
      method: 'POST',
      url:`${this._baseUrl}/movies`,
      extraHeaders: getAuthHeader(this._JWT),
      body: JSON.stringify(film),
    }).then((resp) => resp.json())
  }

  removeFilm(filmId) {
    return request({
      method: 'DELETE',
      url:`${this._baseUrl}/movies/${filmId}`,
      extraHeaders: getAuthHeader(this._JWT),
    })
  }
}

export default new MainApi('http://localhost:5000');
export { MainApi };
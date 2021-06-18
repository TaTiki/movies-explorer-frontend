import request from "./request";

export default function GetFilms() {
  return request({
    method: 'GET',
    url: 'https://api.nomoreparties.co/beatfilm-movies'
  }).then((resp) => resp.json())
  .then((films) => {
    localStorage.setItem('films',JSON.stringify(films));
    return films;
  });
}
import './Footer.css';

export default function Footer() {
  return (
    <div className = "footer">
      <p className = "footer__name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className = "footer__menu">
        <p className = "footer__menu__date">© 2020</p>
        <ul className = "footer__menu__link"> 
          <li className = "footer__menu__link__name">
            <a className = "footer__menu__link__name__link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс Практикум</a>
          </li>
          <li className = "footer__menu__link__name">
            <a className = "footer__menu__link__name__link" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className = "footer__menu__link__name">
            <a className = "footer__menu__link__name__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
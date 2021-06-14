import './Portfolio.css';
import arrows from '../../images/font-main.svg'

export default function Portfolio() {
  return (
    <section className = "portfolio">
      <p className = "portfolio__title">Портфолио</p>
      <nav>
        <ul className = "portfolio__section">
          <li className = "portfolio__section__points">
            <a href = "https://github.com/" className = "portfolio__section__points__link" target="_blank" rel="noreferrer">Статичный сайт
              <img className = "portfolio__section__points__img" src = {arrows} alt="стрелка"/>
            </a>
          </li>
          <li className = "portfolio__section__points">
            <a href = "https://github.com/" className = "portfolio__section__points__link" target="_blank" rel="noreferrer">Адаптивный сайт
              <img className = "portfolio__section__points__img" src = {arrows} alt="стрелка"/>
            </a>
          </li>
          <li className = "portfolio__section__points">
            <a href = "https://github.com/" className = "portfolio__section__points__link" target="_blank" rel="noreferrer">Одностраничное приложение
              <img className = "portfolio__section__points__img" src = {arrows} alt="стрелка"/>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
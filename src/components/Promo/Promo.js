import './Promo.css';
import logo from '../../images/landing-logo.svg';

export default function Promo({ onButtonClick }) {
  return (
    <section className = "promo">
      <div className = "promo__section">
        <div className = "promo__section__info">
          <h2 className = "promo__section__info__title">Учебный проект студента факультета Веб-разработки.</h2>
          <p className = "promo__section__info__comment">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img className = "promo__section__image" src={logo} alt="logo"/>
      </div>
      <div className = "promo__info">
        <button className="promo__info__button" onClick={onButtonClick}>Узнать больше</button>
      </div>
    </section>
  );
}
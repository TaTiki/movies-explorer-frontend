import './AboutMe.css';
import pic from '../../images/pic.svg'

export default function AboutMe() {
  return (
    <section className = "aboutme">
      <h2 className = "aboutme__title">Студент</h2>
      <div className = "aboutme__section">
        <div className = "aboutme__section__text">
          <h3 className = "aboutme__section__text__heading">Виталий</h3>
          <p className = "aboutme__section__text__intro">Фронтенд-разработчик, 30 лет</p>
          <p className = "aboutme__section__text__cv">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. 
            Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <div className = "aboutme__section__text__social">
            <a href = "https://www.facebook.com/" className = "aboutme__section__text__social__item" target="_blank" rel="noreferrer">Facebook</a>
            <a href = "https://github.com/" className = "aboutme__section__text__social__item" target="_blank" rel="noreferrer">Github</a>
          </div>
        </div>
        <img className = "aboutme__section__pic" src={pic} alt="аватарка"/>
      </div>
    </section>
  );
}
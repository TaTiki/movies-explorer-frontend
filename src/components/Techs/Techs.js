import './Techs.css';

export default function Techs() {
  return (
    <section className = "techs">
      <h2 className = "techs__title"> Технологии</h2>
      <div className = "techs__content">
        <h3 className = "techs__content__heading">7 технологий</h3>
        <p className = "techs__content__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className ="techs__array">
        <li className = "techs__array__item">HTML</li>
        <li className = "techs__array__item">CSS</li>
        <li className = "techs__array__item">JS</li>
        <li className = "techs__array__item">React</li>
        <li className = "techs__array__item">Git</li>
        <li className = "techs__array__item">Express.js</li>
        <li className = "techs__array__item">mongoDB</li>
      </ul>
    </section>
  );
}
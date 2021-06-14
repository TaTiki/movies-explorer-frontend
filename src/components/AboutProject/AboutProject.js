
import './AboutProject.css';

export default function AboutProject({ refAbout }) {
  return (
    <section className = "aboutproject" ref={refAbout}>
      <h2 className = "aboutproject__title"> О проекте</h2>
      <div className = "aboutproject__section">
        <div className="aboutproject__section__child">
          <h3 className = "aboutproject__section__child__title">Дипломный проект включал 5 этапов</h3>
          <p className = "aboutproject__section__child__comment">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>         
        </div>
        <div className="aboutproject__section__child">
          <h3 className = "aboutproject__section__child__title">На выполнение проета ушло 5 недель</h3>
          <p className = "aboutproject__section__child__comment"> У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать,чтобы успешно защититься.</p>
        </div>
      </div>
      <div className = "aboutproject__bar">
        <div className = "aboutproject__bar__short">
          <p className = "aboutproject__bar__black"> 1 неделя </p>
          <p className = "aboutproject__bar__comment">Back-end</p>
        </div>
        <div className = "aboutproject__bar__long">
          <p className = "aboutproject__bar__white"> 4 недели</p>
          <p className = "aboutproject__bar__comment">Front-end</p>
        </div>
      </div>
    </section>
  );
}
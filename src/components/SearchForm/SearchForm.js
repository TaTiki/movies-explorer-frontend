import './SearchForm.css'
import smallLupa from '../../images/small_lupa.svg';
import blackLupa from '../../images/black_lupa.svg';

import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

export default function SearchForm() {
  return (
    <div className = "searchform">
      <div className = "searchform__search">
        <img className = "searchform__search__lupa" src={smallLupa} alt="маленькая лупа"/>
        <input className = "searchform__search__input" placeholder="Фильм"/>
        <button className = "searchform__search__button"onClick={() => alert('not implemented')}>
          <img src={blackLupa} alt = "большая лупа"/>
        </button>
      </div>
      <div className = "searchform__line"/>
      <div className = "searchform__box">
        <FilterCheckBox/>
        <p className = "searchform__box__mini">Короткометражки</p>  
      </div>
    </div>
  );
}
import './SearchForm.css'
import smallLupa from '../../images/small_lupa.svg';
import blackLupa from '../../images/black_lupa.svg';

import { useEffect, useState } from 'react';


import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

export default function SearchForm({ word, setWord, short, setShort, alwaysEnabled }) {

  const [keyword, setKeyword] = useState(word);
  const [error, setError] = useState('');

  useEffect(() => {
    setKeyword(word);
  }, [word]);

  const handleChange = (evt) => {
    const keyword = evt.target.value
    if (keyword) {
      setError('');
    }
    setKeyword(keyword);
  };

  const handleClick = () => {
    if (!keyword) {
      setError('Нужно ввести ключевое слово');
      return;
    }
    setWord(keyword);
  }
  
  return (
    <div className = "searchform">
      <div className = "searchform__search">
        <img className = "searchform__search__lupa" src={smallLupa} alt="маленькая лупа"/>
        <input className = "searchform__search__input" placeholder="Фильм" value={keyword} onChange={handleChange}/>
        <button className = "searchform__search__button" onClick={handleClick}>
          <img src={blackLupa} alt = "большая лупа"/>
        </button>
      </div>
      <div className = "searchform__line"/>
      <span className = "searchform__servererror">{error}</span>
      <div className = "searchform__box">
        <FilterCheckBox isChecked={short} setIsChecked={setShort} disabled={!alwaysEnabled && !word}/>
        <p className = "searchform__box__mini">Короткометражки</p>  
      </div>
    </div>
  );
}
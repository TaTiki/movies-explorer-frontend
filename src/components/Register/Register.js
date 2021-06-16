import './Register.css';
import logo from '../../images/logo.svg';

import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Register() {
  const history = useHistory();

  const [fields, setFields] = useState([
    {
      valid: false,
      value: '',
      error: '',
    },
    {
      valid: false,
      value: '',
      error: '',
    },
    {
      valid: false,
      value: '',
      error: '',
    },
  ]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => setDisabled(fields.some((field) => !field.valid)), [fields]);

  const handleChange = (evt, idx) => {
    setFields([
      ...fields.slice(0,idx),
      {
        valid: evt.target.validity.valid,
        value: evt.target.value,
        error: evt.target.validationMessage,
      },
      ...fields.slice(idx+1)
    ]);
  };

  return (
    <div className="register">
      <button className="register__home"onClick={() => history.push('/')}>
        <img className="register__home__logo" src={logo} alt="логотип" />
      </button>
      <p className = "register__title">Добро пожаловать!</p>
      <form className="register__form" noValidate onSubmit={() => alert('not implemented')}>

        <p className="register__form__label">Имя</p>
        <input className={'register__form__field' + (fields[0].error ? ' register__form__field--error' : '')}
        value={fields[0].value} 
        placeholder="Имя" 
        minLength="2" 
        maxLength="30" 
        pattern="^[а-яА-Яa-zA-Z0-9_-]*$"
        onChange={(evt) => handleChange(evt,0)}
        required/>
        <span className="register__form__error">{fields[0].error}</span>

        <p className="register__form__label">E-mail</p>
        <input className={'register__form__field' + (fields[1].error ? ' register__form__field--error' : '')}
        type="email"
        value={fields[1].value}
        placeholder="E-mail"
        onChange={(evt) => handleChange(evt,1)}
        required/>
        <span className="register__form__error">{fields[1].error}</span>

        <p className="register__form__label">Пароль</p>
        <input className={'register__form__field' + (fields[2].error ? ' register__form__field--error' : '')}
        type="password"
        value={fields[2].value}
        minLength="8"
        onChange={(evt) => handleChange(evt,2)}
        required/>
        <span className="register__form__error">{fields[2].error}</span>
        
        <button className={'register__form__button' + (disabled ? ' register__form__button--disabled' : '')} type="submit" disabled={disabled}>Зарегистрироваться</button>
      </form>
      <div className="register__redirect">
        <p>Уже зарегистрированы? <Link className="register__redirect__link" to='/signin'>Войти</Link></p>
      </div>
    </div>
  );
}
import './Register.css';
import logo from '../../images/logo.svg';

import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import validator from 'validator';

export default function Register({ handleRegister }) {
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
  const [disabledInput, setDisabledInput] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => setDisabled(fields.some((field) => !field.valid)), [fields]);

  const handleChange = (evt, idx) => {
    const { type , value, validationMessage } = evt.target;
    const valid = validationMessage === '' && (type === 'email' ? validator.isEmail(value) : true);
    const error = validationMessage || (type === 'email' && !valid ? 'Пожалуйста, введите адрес электронной почты.' : '');
    setFields([
      ...fields.slice(0,idx),
      {
        valid,
        value,
        error,
      },
      ...fields.slice(idx+1)
    ]);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setDisabled(true);
    setDisabledInput(true);
    handleRegister(fields[0].value, fields[1].value, fields[2].value)
    .then(() => history.push('/movies'))
    .catch((err) => {
      setServerError((err && err.message) || 'Что-то пошло не так...');
      setDisabled(false);
      setDisabledInput(false);
    });
  }

  return (
    <div className="register">
      <button className="register__home"onClick={() => history.push('/')}>
        <img className="register__home__logo" src={logo} alt="логотип" />
      </button>
      <p className = "register__title">Добро пожаловать!</p>
      <form className="register__form" noValidate onSubmit={handleSubmit}>

        <p className="register__form__label">Имя</p>
        <input className={'register__form__field' + (fields[0].error ? ' register__form__field--error' : '')}
        value={fields[0].value} 
        placeholder="Имя" 
        minLength="2" 
        maxLength="30" 
        pattern="^[а-яА-Яa-zA-Z0-9 -]*$"
        onChange={(evt) => handleChange(evt,0)}
        required
        disabled={disabledInput}/>
        <span className="register__form__error">{fields[0].error}</span>

        <p className="register__form__label">E-mail</p>
        <input className={'register__form__field' + (fields[1].error ? ' register__form__field--error' : '')}
        type="email"
        value={fields[1].value}
        placeholder="E-mail"
        onChange={(evt) => handleChange(evt,1)}
        required
        disabled={disabledInput}/>
        <span className="register__form__error">{fields[1].error}</span>

        <p className="register__form__label">Пароль</p>
        <input className={'register__form__field' + (fields[2].error ? ' register__form__field--error' : '')}
        type="password"
        value={fields[2].value}
        minLength="8"
        onChange={(evt) => handleChange(evt,2)}
        required
        disabled={disabledInput}/>
        <span className="register__form__error">{fields[2].error}</span>
        
        <span className="register__form__servererror">{serverError}</span>
        <button className={'register__form__button' + (disabled ? ' register__form__button--disabled' : '')} type="submit" disabled={disabled}>Зарегистрироваться</button>
      </form>
      <div className="register__redirect">
        <p>Уже зарегистрированы? <Link className="register__redirect__link" to='/signin'>Войти</Link></p>
      </div>
    </div>
  );
}
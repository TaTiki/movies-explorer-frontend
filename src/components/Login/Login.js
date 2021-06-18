import './Login.css';
import logo from '../../images/logo.svg';

import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import validator from 'validator';

export default function Login({ handleLogin }) {
  const history = useHistory();

  const [fields, setFields] = useState([
    {
      valid:false,
      value: '',
      error: '',
    },
    {
      valid:false,
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
    handleLogin(fields[0].value, fields[1].value)
    .then(() => history.push('/movies'))
    .catch((err) => {
      setServerError((err && err.message) || 'Что-то пошло не так...');
      setDisabled(false);
      setDisabledInput(false);
    });
  }

  return (
    <div className="login">
      <button className="login__home" onClick={() => history.push('/')}>
        <img className="login__home__logo" src={logo} alt="логотип"/>
      </button>
      <p className = "login__title">Рады видеть!</p>
      <form className="login__form" noValidate onSubmit={handleSubmit}>
        <p className="login__form__label">E-mail</p>
        <input className={'login__form__field' + (fields[0].error ? ' login__form__field--error' : '')}
        type="email" value={fields[0].value}
        placeholder="E-mail"
        required
        onChange={(evt) => handleChange(evt, 0)}
        disabled={disabledInput}/>
        <span className="login__form__error">{fields[0].error}</span>

        <p className="login__form__label">Пароль</p>
        <input className={'login__form__field' + (fields[1].error ? ' login__form__field--error' : '')}
        type="password"
        minLength="8"
        required
        onChange={(evt) => handleChange(evt, 1)}
        disabled={disabledInput}/>
        <span className="login__form__error">{fields[1].error}</span>

        <span className="login__form__servererror">{serverError}</span>
        <button className={'login__form__button' + (disabled ? ' login__form__button--disabled' : '')}
        type="submit"
        disabled={disabled}>Войти</button>
      </form>
      <div className="login__redirect">
        <p>Еще не зарегистрировались? <Link to='/signup' className="login__redirect__link">Регистрация</Link></p>
      </div>
    </div>
  );
}
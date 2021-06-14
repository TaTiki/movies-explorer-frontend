import './Login.css';
import logo from '../../images/logo.svg';

import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Login() {
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
    <div className="login">
      <button className="login__home" onClick={() => history.push('/')}>
        <img className="login__home__logo" src={logo} alt="логотип"/>
      </button>
      <p className = "login__title">Рады видеть!</p>
      <form className="login__form" noValidate onSubmit={() => alert('not implemented')}>
        <p className="login__form__label">E-mail</p>
        <input className={'login__form__field' + (fields[0].error ? ' login__form__field--error' : '')}
        type="email" value={fields[0].value}
        placeholder="E-mail"
        required
        onChange={(evt) => handleChange(evt, 0)}/>
        <span className="login__form__error">{fields[0].error}</span>

        <p className="login__form__label">Пароль</p>
        <input className={'login__form__field' + (fields[1].error ? ' login__form__field--error' : '')}
        type="password"
        minLength="8"
        required
        onChange={(evt) => handleChange(evt, 1)}/>
        <span className="login__form__error">{fields[1].error}</span>
        
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
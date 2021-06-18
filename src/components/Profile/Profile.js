import './Profile.css';

import { useContext, useEffect, useState } from 'react';
import validator from 'validator';

import Header from '../Header/Header';
import { CurrentUserContext } from '../../utils/contexts';

export default function Profile({ handleUpdateUser, handleSignOut }) {
  const user = useContext(CurrentUserContext);

  const [fields, setFields] = useState([
    {
      valid: true,
      value: user.name,
      error: '',
    },
    {
      valid: true,
      value: user.email,
      error: '',
    },
  ]);
  const [disabled, setDisabled] = useState(true);
  const [disabledInput, setDisabledInput] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => setDisabled((fields[0].value === user.name && fields[1].value === user.email) || fields.some((field) => !field.valid)), [fields, user]);

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
    handleUpdateUser(fields[1].value, fields[0].value)
    .then(() => {
      setServerError('');
      setDisabled(true);
    })
    .catch((err) => {
      setServerError((err && err.message) || 'Что-то пошло не так...');
      setDisabled(false);
    }).finally(() => {
      setDisabledInput(false);
    });
  } 

  return (
    <div className="profile">
      <Header/>
      <div className="profile__form">
        <div className="profile__form__name">{`Привет, ${user.name}!`}</div>
        <form className="profile__form__info" noValidate onSubmit={handleSubmit}>
          <div className="profile__form__field">
            <p className="profile__form__field__label">Имя</p>
            <input className={'profile__form__field__input' + (fields[0].error ? ' profile__form__field__input--error' : '')}
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            pattern="^[а-яА-Яa-zA-Z0-9- ]*$"
            value={fields[0].value}
            required
            onChange={(evt) => handleChange(evt, 0)}
            disabled={disabledInput}/>
          </div>
          <span className = "profile__form__field__error">{fields[0].error}</span>
          <div className="profile__form__line"/>
          <div className="profile__form__field">
            <p className="profile__form__field__label">E-mail</p>
            <input className={'profile__form__field__input' + (fields[1].error ? ' profile__form__field__input--error' : '')}
            type="email"
            placeholder="E-mail"
            value={fields[1].value}
            required
            onChange={(evt) => handleChange(evt, 1)}
            disabled={disabledInput}/>
          </div>
          <span className = "profile__form__field__error">{fields[1].error}</span>
          <span className = "profile__form__servererror">{serverError}</span>
          <button className={'profile__form__info__submit' + (disabled ? ' profile__form__info__submit--disabled' : '')}
          type="submit"
          disabled={disabled}>Редактировать</button>
        </form>
        <button className="profile__form__logout" onClick={handleSignOut}>Выйти из аккаунта</button>
      </div>
    </div>
  );
}

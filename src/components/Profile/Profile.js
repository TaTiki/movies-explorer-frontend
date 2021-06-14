import './Profile.css';

import { useEffect, useState } from 'react';

import Header from '../Header/Header';

const user = {
  name: "Виталий",
  email: "pochta@yandex.ru",
}

export default function Profile() {
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
    <div className="profile">
      <Header/>
      <div className="profile__form">
        <div className="profile__form__name">{`Привет, ${user.name}!`}</div>
        <form className="profile__form__info" noValidate onSubmit={() => alert('not implemented')}>
          <div className="profile__form__field">
            <p className="profile__form__field__label">Имя</p>
            <input className={'profile__form__field__input' + (fields[0].error ? ' profile__form__field__input--error' : '')}
            placeholder="Имя"
            minLength="2"
            maxLength="30"
            pattern="^[а-яА-Яa-zA-Z0-9_-]*$"
            value={fields[0].value}
            required
            onChange={(evt) => handleChange(evt, 0)}/>
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
            onChange={(evt) => handleChange(evt, 1)}/>
          </div>
          <span className = "profile__form__field__error">{fields[1].error}</span>
          <button className={'profile__form__info__submit' + (disabled ? ' profile__form__info__submit--disabled' : '')}
          type="submit"
          disabled={disabled}>Редактировать</button>
        </form>
        <button className="profile__form__logout" onClick={() => alert('not implemented')}>Выйти из аккаунта</button>
      </div>
    </div>
  );
}

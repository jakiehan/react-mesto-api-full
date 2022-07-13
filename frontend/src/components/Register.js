import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister, isPreloader }) => {

  const btnTitleStatus = isPreloader ? 'Регистрация...' : 'Зарегистрироваться';

  const [values, setValues] = useState({});
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');

  const errorClsInputEmail = errorMessageEmail && 'form__field_type_error';
  const errorClsInputPassword = errorMessagePassword && 'form__field_type_error';

  const isValidBtn = isValidEmail && isValidPassword && true;
  const btnClsDis = !isValidBtn && 'form__btn-s_atr_disabled';
  const btnDis = !isValidBtn && true;

  const handleChange = (e) => {
    const {name, value} = e.target

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))

    if (name === "email") {
      if (!e.target.validity.valid) {
        setIsValidEmail(false);
        setErrorMessageEmail(e.target.validationMessage);
      } else {
        setIsValidEmail(true);
        setErrorMessageEmail('');
      }
    } else {
      if (!e.target.validity.valid) {
        setIsValidPassword(false);
        setErrorMessagePassword(e.target.validationMessage);
      } else {
        setIsValidPassword(true);
        setErrorMessagePassword('');
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {password, email} = values
    onRegister(password, email);
  }

  return (

    <form
      className="form form_margin_top"
      name="form-register"
      onSubmit={handleSubmit}
      noValidate
    >
      <fieldset className="form__input-info">
        <legend className="form__title form_title_type_auth">Регистрация</legend>
        <div className="form__input-wrapper">
          <input
            className={`form__field form__field_type_auth ${errorClsInputEmail}`}
            id="input-email"
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <span className="form__validation-error">
          {errorMessageEmail}
        </span>
        </div>
        <div className="form__input-wrapper">
          <input
            className={`form__field form__field_type_auth ${errorClsInputPassword}`}
            id="input-password"
            type="password"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            placeholder="Пароль"
            required
            minLength="3"
            maxLength="10"
            autoComplete="current-password"
          />
          <span className="form__validation-error">
          {errorMessagePassword}
        </span>
        </div>
        <button
          className={`form__btn-s transparency-button 
            transparency-button_opacity_more form__btn-s_type-auth ${btnClsDis}`}
          type="submit"
          disabled={btnDis}
        >
          {btnTitleStatus}
        </button>
        <Link className="form__link-redirect transparency-button" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </fieldset>
    </form>
  )
}

export default Register;
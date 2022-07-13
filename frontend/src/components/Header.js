import React from 'react';
import logoHeader from "../images/logo-header.svg";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ userEmail, handleSingOut }) => {

  const location = useLocation().pathname;

  return (
  <header className="header">
    <img className="header__logo" src={logoHeader} alt="Логотип" />
    {location === '/'
      ? (
        <div className="header__data">
          <p className="header__email-user">{userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={handleSingOut}>Выйти</Link>
        </div>
      )
      : location === '/sign-up'
      ? (
        <Link to="/sign-in" className="header__link">Войти</Link>
      ) : (
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        )
    }
  </header>
  )
}

export default Header;
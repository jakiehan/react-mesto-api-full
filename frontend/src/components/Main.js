import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = ({ onCardDelete, onEditAvatar, onAddPlace, onCardClick, isCards, onCardLike, onEditProfile }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="Фото профиля"
        />
        <button
          className="profile__avatar-edit"
          type="button"
          aria-label="Edit button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button transparency-button"
              type="button"
              aria-label="Edit button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__rank">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button transparency-button"
          type="button"
          aria-label="Add button"
          onClick={onAddPlace}
        />
      </section>

      <section className="gallery">
        <ul className="gallery__elements">
          {isCards.map((card) =>
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({ card, onCardDelete, onCardLike, onCardClick }) => {

  const currentUser = useContext(CurrentUserContext);

  const cardExists = card.owner ? card.owner._id : ''

  const isOwn = cardExists === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const likesCount = (!!card.likes.length && card.likes.length);

  const handleDeleteClick = () => onCardDelete(card);
  const handleLikeClick = () => onCardLike(card);
  const handleClick = () => onCardClick(card);

  return (
    <li className="gallery__element">
      <article className="photo-card">
        <img
          className="photo-card__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        /> {isOwn &&
          <button
            className="photo-card__trash transparency-button"
            type="button"
            aria-label="Trash button"
            onClick={handleDeleteClick}
          />
          }
          <div className="photo-card__info">
            <h2 className="photo-card__image-title">{card.name}</h2>
            <div className="photo-card__image-like-wrapper">
              <button
                className={`photo-card__image-like ${isLiked && 'photo-card__image-like_active'} transparency-button transparency-button_opacity_less`}
                type="button"
                aria-label="Like button"
                onClick={handleLikeClick}
              />
              <span className="photo-card__image-like-count">{likesCount}</span>
            </div>
          </div>
      </article>
    </li>
  )
}

export default Card;
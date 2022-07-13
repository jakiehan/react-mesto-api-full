import React from 'react';

const ImagePopup = ({ card, onClose }) => {

  const isOpen = card._id && true;

  return (
    <div
      className={`popup popup_viewing-photo ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__wrapper" onClick={(e) => e.stopPropagation()}>
        <figure className="popup__viewing-form">
          <img
            className="popup__image"
            src={`${card._id && card.link}`}
            alt={card.name}
          />
          <figcaption className="popup__image-title">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close-btn popup__close-btn_type_view transparency-button"
          type="button"
          aria-label="Close button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const DeletePlacePopup = ({ card, onClose, onCardDelete, isPreloader }) => {

  const isOpen = card._id && true;

  const btnTitleStatus = isPreloader ? 'Удаление...' : 'Да'

  const handleSubmit = () => {
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="type_delete-card"
      isOpen={isOpen}
      onClose={onClose}
    >
      <h3 className="popup__title ">Вы уверены?</h3>
      <button
        className="form__btn-s form__btn-s_position_center transparency-button transparency-button_opacity_more"
        type="submit"
        onClick={handleSubmit}
      >
        {btnTitleStatus}
      </button>
    </PopupWithForm>
  )
}

export default DeletePlacePopup;
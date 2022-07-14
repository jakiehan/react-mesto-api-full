import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import crash from '../images/crash.svg'
import successfully from '../images/successfully.svg'
import { useEffect } from 'react';

const InfoTooltip = ({ onClose, isOpen, isRegistered, isMessage }) => {

  useEffect(() => {
    registerIcon = '';
  }, [isRegistered])

  let registerIcon = isRegistered ? successfully : crash;

  return (
    <PopupWithForm
      name="type_info-tooltip"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <img className="popup__icon" src={registerIcon} alt="Логотип" />
      <p className="popup__title popup__title_position_center">{isRegistered ? 'Вы успешно зарегистрировались!' : isMessage}</p>
    </PopupWithForm>
  )
}

export default InfoTooltip;
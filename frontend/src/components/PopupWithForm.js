import React, { useEffect } from 'react';

const PopupWithForm = ({ isOpen, onClose, name, onSubmit, children, btnTitle, isPreloader, preloaderBtnTitle, btnIsValid, formTitle }) => {

  const popupTypeDelete = name === 'type_delete-card';
  const popupTypeInfoTooltip = name === 'type_info-tooltip';
  const btnTitleStatus = isPreloader ? preloaderBtnTitle : btnTitle;
  const btnClsDis = !btnIsValid && 'form__btn-s_atr_disabled';
  const btnDis = !btnIsValid && true;

  useEffect(() => {
    const closeAllPopupsOnEscape = (e) => {

      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeAllPopupsOnEscape);
    return () => document.removeEventListener('keydown', closeAllPopupsOnEscape);
  })

  return (
     <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`} onMouseDown={onClose}>
      <div className="popup__container" onMouseDown={(e) => e.stopPropagation()}>
        {popupTypeDelete
          ? (
            children
          ) :
         popupTypeInfoTooltip
            ? (
             children
          ) : (
            <form
              className={`form form_${name}`}
              name="form"
              onSubmit={onSubmit}
              noValidate
            >
              <fieldset className="form__input-info">
                <legend className="form__title">{formTitle}</legend>
                {children}
                <button
                  className={`form__btn-s form__btn-s_${name} transparency-button transparency-button_opacity_more ${btnClsDis}`}
                  type="submit"
                  disabled={btnDis}
                >
                  {btnTitleStatus}
                </button>
              </fieldset>
            </form>
          )}

        <button
          className={`popup__close-btn popup__close-btn_${name} transparency-button`}
          type="button"
          aria-label="Close button"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm;
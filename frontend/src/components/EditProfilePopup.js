import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPreloader }) => {

  const currentUser = useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormAndValidation();

  const errorClsInputName = errors.name && 'form__field_type_error';
  const errorClsInputAbout = errors.about && 'form__field_type_error';

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    resetForm();
    setValues(currentUser);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="type_profile"
      formTitle="Редактировать профиль"
      btnTitle="Сохранить"
      preloaderBtnTitle="Сохранение..."
      btnIsValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputName}`}
          id="input-name"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Имя профиля"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="form__validation-error">
          {errors.name}
        </span>
      </div>
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputAbout}`}
          id="input-about"
          type="text"
          name="about"
          value={values.about || ''}
          onChange={handleChange}
          placeholder="Род деятельности"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="form__validation-error">
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
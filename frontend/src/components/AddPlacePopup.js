import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const AddPlacePopup = ({ isOpen, onClose, onUploadCard, isPreloader }) => {

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  const errorClsInputName = errors.name && 'form__field_type_error';
  const errorClsInputLink = errors.link && 'form__field_type_error';

  const handleSubmit = (e) => {
    e.preventDefault();

    onUploadCard({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="type_card"
      formTitle="Новое место"
      btnTitle="Создать"
      preloaderBtnTitle="Создание..."
      btnIsValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputName}`}
          id="input-title"
          type="text"
          name="name"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="form__validation-error">
          {errors.name}
        </span>
      </div>
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInputLink}`}
          id="input-link"
          type="url"
          name="link"
          value={values.link || ''}
          onChange={handleChange}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__validation-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
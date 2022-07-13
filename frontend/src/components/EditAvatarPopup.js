import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isPreloader }) => {

  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  const errorClsInput = errors.avatar && 'form__field_type_error';

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="type_avatar"
      formTitle="Обновить аватар"
      btnTitle="Обновить"
      preloaderBtnTitle="Обновление..."
      btnIsValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPreloader={isPreloader}
    >
      <div className="form__input-wrapper">
        <input
          className={`form__field ${errorClsInput}`}
          id="input-link-avatar"
          type="url"
          name="avatar"
          value={values.avatar || ''}
          onChange={handleChange}
          placeholder="Ссылка на фото"
          required
        />
        <span className="form__validation-error">
          {errors.avatar}
        </span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
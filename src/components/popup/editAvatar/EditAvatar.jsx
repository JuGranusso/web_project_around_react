import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm";
import "./editAvatar.css";

export default function EditAvatar({ onClose, isOpen }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar-form"
      title="Alterar foto do perfil"
      submitLabel="Salvar"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_url"
        type="url"
        id="avatar-link"
        name="link"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
        ref={avatarRef}
      />
      <span className="popup__error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

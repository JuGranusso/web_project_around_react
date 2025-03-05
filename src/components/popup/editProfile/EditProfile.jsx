import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm";
import "./editProfile.css";

export default function EditProfile({ onClose, isOpen }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile-form"
      title="Editar Perfil"
      submitLabel="Salvar"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="owner-name"
        maxLength="40"
        minLength="2"
        name="userName"
        placeholder="Nome"
        required
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error" id="owner-name-error"></span>
      <input
        className="popup__input popup__input_type_description"
        id="owner-description"
        maxLength="200"
        minLength="2"
        name="userDescription"
        placeholder="Sobre mim"
        required
        type="text"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error" id="owner-description-error"></span>
    </PopupWithForm>
  );
}

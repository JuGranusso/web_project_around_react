import { useState } from "react";
import PopupWithForm from "../PopupWithForm";
import "./newCard.css";

export default function NewCard({ onClose, onAddPlaceSubmit, isOpen }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name: title, link });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="card-form"
      title="Novo Local"
      submitLabel="Criar"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        id="title"
        name="title"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={title}
        onChange={handleTitleChange}
      />
      <span className="popup__error" id="title-error"></span>

      <input
        className="popup__input popup__input_type_url"
        type="url"
        id="link"
        name="link"
        placeholder="Link de imagem"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

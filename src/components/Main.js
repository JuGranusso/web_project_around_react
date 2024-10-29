import { useState } from "react";

import PopupWithForm from "./PopupWithForm";

import custeauPhoto from "../images/cousteau.png";
import editButtonIcon from "../images/editbutton.svg";
import addButtonIcon from "../images/buttonadd.svg";

function Main() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__photo"
            src={custeauPhoto}
            alt="Foto de perfil de Jacques Cousteau"
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile__editor">
          <div className="profile__data">
            <h1 className="profile__name">Jacques Cousteau</h1>
            <button className="profile__edit" onClick={handleEditProfileClick}>
              <img
                src={editButtonIcon}
                alt="botão para editar nome de perfil"
              />
            </button>
          </div>
          <p className="profile__subtitle">Explorador</p>
        </div>
        <div className="profile__button-add" onClick={handleAddPlaceClick}>
          <button className="profile__add">
            <img src={addButtonIcon} alt="botão para adicionar perfil" />
          </button>
        </div>
      </section>

      <section className="photo-grid"></section>

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={() => setIsEditProfilePopupOpen(false)}
        name="profile-form"
        title="Editar Perfil"
        submitLabel="Salvar"
      >
        <input
          className="form__input"
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome de Usuário"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__error nome-error"></span>

        <input
          className="form__input"
          type="text"
          id="profissao"
          name="profissao"
          placeholder="Profissão"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__error profissao-error"></span>
      </PopupWithForm>
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={() => setIsAddPlacePopupOpen(false)}
        name="card-form"
        title="Novo Local"
        submitLabel="Criar"
      >
        <input
          className="form__input"
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__error title-error"></span>

        <input
          className="form__input"
          type="url"
          id="link"
          name="link"
          placeholder="Link de imagem"
          required
        />
        <span className="form__error link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="delete-form"
        title="Tem Certeza?"
        submitLabel="Sim"
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={() => setIsEditAvatarPopupOpen(false)}
        name="avatar-form"
        title="Alterar foto do perfil"
        submitLabel="Salvar"
      >
        <input
          className="form__input"
          type="url"
          id="link"
          name="link"
          placeholder="https://somewebsite.com/someimage.jpg"
          required
        />
        <span className="form__error link-error"></span>
      </PopupWithForm>
    </main>
  );
}

export default Main;

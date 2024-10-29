import { useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

import custeauPhoto from "../images/cousteau.png";
import editButtonIcon from "../images/editbutton.svg";
import addButtonIcon from "../images/buttonadd.svg";
import { api } from "../utils/api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";

function Main() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [userName, setUserName] = useState("Jacques Custeau");
  const [userDescription, setUserDescription] = useState("Explorador");
  const [userAvatar, setUserAvatar] = useState(custeauPhoto);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    api.getUserInfo().then(({ name, about, avatar }) => {
      setUserAvatar(avatar);
      setUserDescription(about);
      setUserName(name);
    });

    api.getCards().then((cards) => {
      setCards(cards.map(({ name, link }) => ({ name, photoUrl: link })));
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__photo"
            src={userAvatar}
            alt={`Foto de perfil de ${userName}`}
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile__editor">
          <div className="profile__data">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit" onClick={handleEditProfileClick}>
              <img
                src={editButtonIcon}
                alt="botão para editar nome de perfil"
              />
            </button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <div className="profile__button-add" onClick={handleAddPlaceClick}>
          <button className="profile__add">
            <img src={addButtonIcon} alt="botão para adicionar perfil" />
          </button>
        </div>
      </section>

      <section className="photo-grid">
        {cards.map((card) => (
          <Card
            key={card.name}
            name={card.name}
            photoUrl={card.photoUrl}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </section>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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

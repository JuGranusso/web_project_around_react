import { useContext, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

import editButtonIcon from "../images/editbutton.svg";
import addButtonIcon from "../images/buttonadd.svg";
import { api } from "../utils/api";
import Card from "./Card";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const transformCard = (card, currentUser) => ({
  ...card,
  isLiked: card.likes.some((owner) => owner._id === currentUser._id),
  photoUrl: card.link,
  link: undefined,
});

function Main() {
  const { avatar, about, name } = useContext(CurrentUserContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  console.log("cards", cards);

  const currentUser = useContext(CurrentUserContext);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some((owner) => owner._id === currentUser._id);

    const likePromise = isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id);

    likePromise
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id
              ? transformCard(newCard, currentUser)
              : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards.map((card) => transformCard(card, currentUser)));
    });
  }, [currentUser]);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__photo"
            src={avatar}
            alt={`Foto de perfil de ${name}`}
            onClick={handleEditAvatarClick}
          />
        </div>
        <div className="profile__editor">
          <div className="profile__data">
            <h1 className="profile__name">{name}</h1>
            <button className="profile__edit" onClick={handleEditProfileClick}>
              <img
                src={editButtonIcon}
                alt="botão para editar nome de perfil"
              />
            </button>
          </div>
          <p className="profile__subtitle">{about}</p>
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
            key={card._id}
            name={card.name}
            photoUrl={card.photoUrl}
            onClick={() => setSelectedCard(card)}
            onCardLike={() => handleCardLike(card)}
            isLiked={card.isLiked}
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

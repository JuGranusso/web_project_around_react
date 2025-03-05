import { useContext, useState } from "react";
import editButtonIcon from "../../images/editbutton.svg";
import addButtonIcon from "../../images/buttonadd.svg";
import Card from "./components/card/Card.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfile from "../popup/editProfile/EditProfile.jsx";
import EditAvatar from "../popup/editAvatar/EditAvatar.jsx";
import Popup from "../popup/imagePopup/ImagePopup.jsx";
import NewCard from "../popup/newCard/NewCard.jsx";
import RemoveCard from "../popup/removeCard/RemoveCard.jsx";
import "./main.css";

function Main({ cards, onCardLike, onCardDelete, onAddPlaceSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { avatar, about, name } = currentUser;

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [popup, setPopup] = useState({
    isEditProfileOpen: false,
    isAddPlaceOpen: false,
    isEditAvatarOpen: false,
    isImagePopupOpen: false,
    isDeleteConfirmationOpen: false,
  });

  const handleOpenPopup = (popupName) => {
    setPopup({
      ...popup,
      [popupName]: true,
    });
  };

  const handleClosePopup = () => {
    setPopup({
      isEditProfileOpen: false,
      isAddPlaceOpen: false,
      isEditAvatarOpen: false,
      isImagePopupOpen: false,
      isDeleteConfirmationOpen: false,
    });
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    handleOpenPopup("isImagePopupOpen");
  };

  const handleDeleteClick = (cardId) => {
    setCardToDelete(cardId);
    handleOpenPopup("isDeleteConfirmationOpen");
  };

  const handleEditAvatarClick = () => {
    handleOpenPopup("isEditAvatarOpen");
  };

  const handleEditProfileClick = () => {
    handleOpenPopup("isEditProfileOpen");
  };

  const handleAddPlaceClick = () => {
    handleOpenPopup("isAddPlaceOpen");
  };

  return (
    <>
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
              <button
                className="profile__edit"
                onClick={handleEditProfileClick}
              >
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
              photoUrl={card.link}
              onClick={() => handleCardClick(card)}
              onCardLike={() => onCardLike(card)}
              onCardDelete={() => handleDeleteClick(card._id)}
              isLiked={card.isLiked}
              isOwner={card.owner._id === currentUser._id}
            />
          ))}
        </section>
      </main>

      {popup.isEditProfileOpen && (
        <EditProfile
          onClose={handleClosePopup}
          isOpen={popup.isEditProfileOpen}
        />
      )}
      {popup.isEditAvatarOpen && (
        <EditAvatar
          onClose={handleClosePopup}
          isOpen={popup.isEditAvatarOpen}
        />
      )}
      {popup.isAddPlaceOpen && (
        <NewCard
          onClose={handleClosePopup}
          onAddPlaceSubmit={onAddPlaceSubmit}
          isOpen={popup.isAddPlaceOpen}
        />
      )}
      {popup.isImagePopupOpen && (
        <Popup
          card={selectedCard}
          onClose={handleClosePopup}
          isOpen={popup.isImagePopupOpen}
        />
      )}
      {popup.isDeleteConfirmationOpen && (
        <RemoveCard
          isOpen={popup.isDeleteConfirmationOpen}
          onClose={handleClosePopup}
          onCardRemove={onCardDelete}
          cardId={cardToDelete || ""}
        />
      )}
    </>
  );
}

export default Main;

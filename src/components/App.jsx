import { useEffect, useState } from "react";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfile from "./popup/editProfile/EditProfile.jsx";
import EditAvatar from "./popup/editAvatar/EditAvatar.jsx";
import ImagePopup from "./popup/imagePopup/ImagePopup.jsx";
import NewCard from "./popup/newCard/NewCard.jsx";
import RemoveCard from "./popup/removeCard/RemoveCard.jsx";
import "./app.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Custeau",
    about: "Explorador",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [popup, setPopup] = useState({
    isEditProfileOpen: false,
    isAddPlaceOpen: false,
    isEditAvatarOpen: false,
    isImagePopupOpen: false,
    isDeleteConfirmationOpen: false,
  });
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(
          cardsData
            .map((card) => ({
              ...card,
              isLiked: card.likes.some((like) => like._id === userData._id),
            }))
            .reverse()
        );
      })
      .catch((error) => console.error(error));
  }, []);

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

  const handleUpdateUser = (data) => {
    return api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    return api
      .editUserAvatar(data)
      .then((newData) => {
        setCurrentUser((prevUser) => ({ ...prevUser, avatar: newData.avatar }));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id
              ? { ...newCard, isLiked: !isLiked }
              : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .createNewCard(cardData)
      .then((newCard) => {
        setCards([{ ...newCard, isLiked: false }, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
          onOpenPopup={handleOpenPopup}
        />
        <Footer />

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
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isOpen={popup.isAddPlaceOpen}
          />
        )}
        {popup.isImagePopupOpen && (
          <ImagePopup
            card={selectedCard}
            onClose={handleClosePopup}
            isOpen={popup.isImagePopupOpen}
          />
        )}
        {popup.isDeleteConfirmationOpen && (
          <RemoveCard
            isOpen={popup.isDeleteConfirmationOpen}
            onClose={handleClosePopup}
            onCardRemove={handleCardDelete}
            cardId={cardToDelete || ""}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

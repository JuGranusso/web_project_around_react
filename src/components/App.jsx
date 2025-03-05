import { useEffect, useState } from "react";
import Header from "./header/Header.jsx";
import Main from "./main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import "./app.css";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Custeau",
    about: "Explorador",
    avatar: "",
  });
  const [cards, setCards] = useState([]);

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

  const handleUpdateUser = (data) => {
    return api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        return newData;
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    return api
      .editUserAvatar(data)
      .then((newData) => {
        setCurrentUser((prevUser) => ({ ...prevUser, avatar: newData.avatar }));
        return newData;
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
    return api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
      })
      .catch((error) => console.error(error));
  };

  const handleAddPlaceSubmit = (cardData) => {
    return api
      .createNewCard(cardData)
      .then((newCard) => {
        setCards([{ ...newCard, isLiked: false }, ...cards]);
        return newCard;
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

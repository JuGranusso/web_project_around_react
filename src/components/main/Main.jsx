import { useContext } from "react";
import editButtonIcon from "../../images/editbutton.svg";
import addButtonIcon from "../../images/buttonadd.svg";
import Card from "./components/card/Card.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./main.css";

function Main({ cards, onCardClick, onCardLike, onCardDelete, onOpenPopup }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { avatar, about, name } = currentUser;

  const handleEditAvatarClick = () => {
    onOpenPopup("isEditAvatarOpen");
  };

  const handleEditProfileClick = () => {
    onOpenPopup("isEditProfileOpen");
  };

  const handleAddPlaceClick = () => {
    onOpenPopup("isAddPlaceOpen");
  };

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
            photoUrl={card.link}
            onClick={() => onCardClick(card)}
            onCardLike={() => onCardLike(card)}
            onCardDelete={() => onCardDelete(card._id)}
            isLiked={card.isLiked}
            isOwner={card.owner._id === currentUser._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

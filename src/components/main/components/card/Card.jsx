import likeIcon from "../../../../images/like.svg";
import likedIcon from "../../../../images/liked.svg";
import thrashIcon from "../../../../images/trash.svg";
import "./card.css";

function Card({
  photoUrl,
  name,
  onClick,
  isLiked,
  onCardLike,
  onCardDelete,
  isOwner,
}) {
  // Verificar se o usuário atual "curtiu" o cartão
  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked ? "photo-grid__like_is-active" : ""
  }`;

  return (
    <div className="photo-grid__card">
      <img
        className={`photo-grid__delete ${
          isOwner ? "photo-grid__delete_show" : ""
        }`}
        src={thrashIcon}
        alt="botão para excluir"
        onClick={onCardDelete}
      />
      <img
        className="photo-grid__photo"
        src={photoUrl}
        onClick={onClick}
        alt={name}
      />
      <div className="photo-grid__description">
        <p className="photo-grid__name">{name}</p>
        <div className="photo-grid__likes">
          <img
            className={cardLikeButtonClassName}
            src={isLiked ? likedIcon : likeIcon}
            alt="botão para curtir"
            onClick={onCardLike}
          />
          <span className="photo-grid__like-count"></span>
        </div>
      </div>
    </div>
  );
}

export default Card;

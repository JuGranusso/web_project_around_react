import likeIcon from "../images/like.svg";
import likedIcon from "../images/liked.svg";
import thrashIcon from "../images/like.svg";

function Card({ photoUrl, name, onClick, isLiked, onCardLike }) {
  return (
    <div class="photo-grid__card">
      <img
        class="photo-grid__delete"
        src={thrashIcon}
        alt="botão para excluir"
      />
      <img
        class="photo-grid__photo"
        src={photoUrl}
        onClick={onClick}
        alt={name}
      />
      <div class="photo-grid__description">
        <p class="photo-grid__name">{name}</p>
        <div class="photo-grid__likes">
          <img
            class="photo-grid__like"
            src={isLiked ? likedIcon : likeIcon}
            alt="botão para curtir"
            onClick={onCardLike}
          />
          <span class="photo-grid__like-count"></span>
        </div>
      </div>
    </div>
  );
}

export default Card;

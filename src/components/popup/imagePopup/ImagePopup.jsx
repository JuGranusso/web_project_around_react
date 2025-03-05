import Popup from "../Popup";
import "./imagePopup.css";

export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="image">
      <figure className="popup__figure">
        <img
          className="popup__image"
          src={card?.link || card?.photoUrl}
          alt={card?.name || ""}
        />
        <figcaption className="popup__caption">{card?.name || ""}</figcaption>
      </figure>
    </Popup>
  );
}

import exitButtonIcon from "../images/exit.svg";

function ImagePopup({ card, onClose }) {
  if (!card) {
    return null;
  }

  const { photoUrl, name } = card;
  return (
    <div className="img-popup img-popup_visible">
      <div className="img-popup__container">
        <button className="img-popup__exit" onClick={onClose}>
          <img src={exitButtonIcon} alt="Botão Sair" />
        </button>
        <img className="img-popup__photo" src={photoUrl} />
        <p className="img-popup__caption">{name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;

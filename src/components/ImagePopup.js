import exitButtonIcon from "../images/exit.svg";

function ImagePopup() {
  return (
    <div className="img-popup">
      <div className="img-popup__container">
        <button className="img-popup__exit">
          <img src={exitButtonIcon} alt="Botão Sair" />
        </button>
        <img className="img-popup__photo" />
        <p className="img-popup__caption"></p>
      </div>
    </div>
  );
}

export default ImagePopup;

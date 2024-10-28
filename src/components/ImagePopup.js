import exitButtonIcon from "../images/exit.svg";

function ImagePopup() {
  return (
    <div class="img-popup">
      <div class="img-popup__container">
        <button class="img-popup__exit">
          <img src={exitButtonIcon} alt="Botão Sair" />
        </button>
        <img class="img-popup__photo" />
        <p class="img-popup__caption"></p>
      </div>
    </div>
  );
}

export default ImagePopup;

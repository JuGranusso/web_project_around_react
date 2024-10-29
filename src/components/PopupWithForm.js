import exitButtonIcon from "../images/exit.svg";

function PopupWithForm({ title, submitLabel, isOpen, onClose, children }) {
  return (
    <div className={`form ${isOpen ? "form_visible" : ""}`}>
      <div className="form__card">
        <button className="form__exit" onClick={onClose}>
          <img src={exitButtonIcon} alt="Botão Sair" />
        </button>

        <form className="form__body">
          <p className="form__label">{title}</p>
          <div className="form__data">{children}</div>
          <button className="form__button" type="submit">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

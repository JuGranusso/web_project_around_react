import Popup from "./Popup.jsx";
import "./popupWithForm.css";

export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  submitLabel,
  children,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
        {children}
        <button className="popup__button" type="submit">
          {submitLabel}
        </button>
      </form>
    </Popup>
  );
}

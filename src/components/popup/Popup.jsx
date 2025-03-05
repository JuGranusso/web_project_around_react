import "./popup.css";

export default function Popup({ isOpen, onClose, name, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
}

import PopupWithForm from "../PopupWithForm";
import "./removeCard.css";

export default function RemoveCard({ isOpen, onClose, onCardRemove, cardId }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardRemove(cardId);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="delete-form"
      title="Tem Certeza?"
      submitLabel="Sim"
      onSubmit={handleSubmit}
    />
  );
}

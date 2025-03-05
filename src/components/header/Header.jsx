import logo from "../../images/logo.svg";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around The US" className="header__logo" />
    </header>
  );
}

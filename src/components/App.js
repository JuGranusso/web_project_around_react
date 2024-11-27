import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import custeauPhoto from "../images/cousteau.png";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Custeau",
    about: "Explorador",
    avatar: custeauPhoto,
  });

  useEffect(() => {
    api.getUserInfo().then((currentUserData) => {
      setCurrentUser(currentUserData);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import custeauPhoto from "../images/cousteau.png";
import editButtonIcon from "../images/editbutton.svg";
import addButtonIcon from "../images/buttonadd.svg";
import exitButtonIcon from "../images/exit.svg";

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__photo"
            src={custeauPhoto}
            alt="Foto de perfil de Jacques Cousteau"
          />
        </div>
        <div className="profile__editor">
          <div className="profile__data">
            <h1 className="profile__name">Jacques Cousteau</h1>
            <button className="profile__edit">
              <img
                src={editButtonIcon}
                alt="botão para editar nome de perfil"
              />
            </button>
          </div>
          <p className="profile__subtitle">Explorador</p>
        </div>
        <div className="profile__button-add">
          <button className="profile__add">
            <img src={addButtonIcon} alt="botão para adicionar perfil" />
          </button>
        </div>
      </section>

      <section className="photo-grid"></section>

      <div className="form">
        <div className="form__card">
          <button className="form__exit">
            <img src={exitButtonIcon} alt="Botão Sair" />
          </button>

          <form className="form__body">
            <p className="form__label">Editar perfil</p>
            <div className="form__data">
              <input
                className="form__input"
                type="text"
                id="nome"
                name="nome"
                placeholder="Nome de Usuário"
                minlength="2"
                maxlength="40"
                required
              />
              <span className="form__error nome-error"></span>

              <input
                className="form__input"
                type="text"
                id="profissao"
                name="profissao"
                placeholder="Profissão"
                minlength="2"
                maxlength="200"
                required
              />
              <span className="form__error profissao-error"></span>
            </div>
            <button className="form__button" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </div>
      <div className="card-form">
        <div className="card-form__card">
          <button className="card-form__exit">
            <img src={exitButtonIcon} alt="Botão Sair" />
          </button>

          <form className="card-form__body">
            <p className="card-form__label">Novo Local</p>
            <div className="card-form__data">
              <input
                className="card-form__input"
                type="text"
                id="title"
                name="title"
                placeholder="Título"
                minlength="2"
                maxlength="30"
                required
              />
              <span className="card-form__error title-error"></span>

              <input
                className="card-form__input"
                type="url"
                id="link"
                name="link"
                placeholder="Link de imagem"
                required
              />
              <span className="card-form__error link-error"></span>
            </div>
            <button className="card-form__button" type="submit">
              Criar
            </button>
          </form>
        </div>
      </div>
      <div className="delete-form">
        <div className="delete-form__card">
          <button className="delete-form__exit">
            <img src={exitButtonIcon} alt="Botão Sair" />
          </button>

          <form className="delete-form__body">
            <p className="delete-form__label">Tem Certeza?</p>
            <button className="delete-form__button" type="submit">
              Sim
            </button>
          </form>
        </div>
      </div>
      <div className="avatar-form">
        <div className="avatar-form__card">
          <button className="avatar-form__exit">
            <img src={exitButtonIcon} alt="Botão Sair" />
          </button>

          <form className="avatar-form__body">
            <p className="avatar-form__label">Alterar foto do perfil</p>
            <div className="avatar-form__data">
              <input
                className="avatar-form__input"
                type="url"
                id="link"
                name="link"
                placeholder="https://somewebsite.com/someimage.jpg"
                required
              />
              <span className="avatar-form__error link-error"></span>
            </div>
            <button className="avatar-form__button" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Main;

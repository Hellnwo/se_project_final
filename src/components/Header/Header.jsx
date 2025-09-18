import "./Header.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation";
import SearchForm from "../SearchForm";

function Header({
  onSigninClick,
  isLoggedIn,
  handleSignOut,
  onArticleSearch,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__nav">
        <Navigation
          onSigninClick={onSigninClick}
          currentUser={currentUser}
          handleSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
      </div>
      <div className="header__content">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__caption">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
        <SearchForm onArticleSearch={onArticleSearch} />
      </div>
    </header>
  );
}

export default Header;

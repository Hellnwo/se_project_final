import "./Header.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  onSignInClick,
  isLoggedIn,
  handleSignOut,
  onNewsArticlesSearched,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__nav">
        <Navigation
          onSignInClick={onSignInClick}
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
        <SearchForm onNewsArticlesSearched={onNewsArticlesSearched} />
      </div>
    </header>
  );
}

export default Header;

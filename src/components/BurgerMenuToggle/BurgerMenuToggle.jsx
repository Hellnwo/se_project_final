import "./BurgerMenuToggle.css";
import { Link } from "react-router-dom";
import close from "../../assets/close.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import logoutw from "../../assets/logoutw.svg";

function BurgerMenuToggle({
  isShowMobileMenu,
  onSignInClick,
  toggleMobileMenu,
  isSavedArticles,
  isHomeArticles,
  handleSignout,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <nav
      className={`nav-mobile-menu ${
        isShowMobileMenu ? "nav-mobile-menu_active" : ""
      }`}
    >
      <ul className="nav-mobile-menu__logo-and-btn">
        <li className="nav-mobile-menu__logo">NewsExplorer</li>
        <button
          className="nav-mobile-menu__close-btn"
          type="button"
          onClick={() => toggleMobileMenu()}
        >
          <img
            src={close}
            alt="Close Button"
            className="nav-mobile-menu__close"
          />
        </button>
      </ul>
      {isLoggedIn ? (
        <ul className="nav-mobile-menu__links">
          <li>
            <Link
              to="/"
              className={`nav-mobile-menu__link ${
                isHomeArticles ? "nav-mobile-menu__link_home" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/saved-news"
              className={`nav-mobile-menu__link ${
                isSavedArticles
                  ? "nav-mobile-menu__link_saved"
                  : ""
              }`}
            >
              Saved articles
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-mobile-menu__links">
          <li>
            <Link
              to="/"
              className={`nav-mobile-menu__link ${
                isHomeArticles ? "nav-mobile-menu__link_home" : ""
              }`}
            >
              Home
            </Link>
          </li>
        </ul>
      )}
      {isLoggedIn ? (
        <button
          className="nav-mobile-menu__links-signout"
          onClick={() => {
            toggleMobileMenu();
            handleSignout();
          }}
        >
          {currentUser.username}
          <img
            src={logoutw}
            alt="Sign-Out Button"
            className="nav-mobile-menu__links-signout-icon"
          />
        </button>
      ) : (
        <button
          className="nav-mobile-menu__links-signin"
          onClick={() => {
            toggleMobileMenu();
            onSignInClick();
          }}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default BurgerMenuToggle;
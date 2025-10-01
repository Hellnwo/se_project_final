import "./navigation.css";
import { useLocation, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logouta from "../../assets/logouta.svg";
import logoutb from "../../assets/logoutb.svg";
import BurgerMenuToggle from "../BurgerMenuToggle/BurgerMenuToggle";
import menubtn from "../../assets/menu.svg";
import menubtns from "../../assets/menus.svg";

function Navigation({ onSignInClick, isLoggedIn, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHomeArticles = location.pathname === "/";
  const isSavedArticles = location.pathname == "/saved-news";

  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => setIsShowMobileMenu(!isShowMobileMenu);

  return (
    <nav className={`nav ${isSavedArticles ? "nav_news-articles-saved" : ""}`}>
      <NavLink
        to="/"
        className={`nav__logo ${
          isSavedArticles ? "nav__logo-saved-articles" : ""
        }`}
      >
        NewsExplorer
      </NavLink>

      <div className="nav__links">
        <NavLink
          to="/"
          className={`nav__links-home ${
            isSavedArticles ? "nav__links-home_active" : ""
          }`}
        >
          Home
        </NavLink>
        {!isLoggedIn && isHomeArticles ? (
          <button
            onClick={onSignInClick}
            type="button"
            className="nav__links-signin-btn"
          >
            Sign in
          </button>
        ) : (
          <div className="nav__links-signin">
            <NavLink
              to="/saved-news"
              className={`nav__links-saved-articles ${
                isLoggedIn && isHomeArticles
                  ? "nav__links-saved-articles_active"
                  : ""
              }`}
            >
              Saved articles
            </NavLink>
            <button
              className={`nav__links-signout-btn ${
                isLoggedIn && isHomeArticles
                  ? "nav__links-signout-btn-home"
                  : ""
              }`}
              onClick={handleSignOut}
            >
              {currentUser.username}
              <img
                src={isLoggedIn && isHomeArticles ? logouta : logoutb}
                alt="signout btn"
                className="nav__Links-btn-img"
              />
            </button>
          </div>
        )}
      </div>
      {currentUser && isHomeArticles && (
        <button
          className="nav__mobile-menu-home-btn"
          onClick={toggleMobileMenu}
        >
          <img src={menubtn} alt="mobile btn" />
        </button>
      )}
      {isLoggedIn && currentUser && isSavedArticles && (
        <button
          className="nav__mobile-menu-saved-btn"
          onClick={toggleMobileMenu}
        >
          <img src={menubtns} alt="mobile btn" />
        </button>
      )}
      {isShowMobileMenu && (
        <BurgerMenuToggle
          onSignInClick={onSignInClick}
          isShowMobileMenu={isShowMobileMenu}
          toggleMobileMenu={toggleMobileMenu}
          handleSignout={handleSignOut}
          isLoggedIn={isLoggedIn}
          isHomeArticles={isHomeArticles}
          isSavedArticles={isSavedArticles}
          currentUser={currentUser?.username}
        />
      )}
    </nav>
  );
}

export default Navigation;

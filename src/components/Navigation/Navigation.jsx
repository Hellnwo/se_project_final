import "./navigation.css";
import { useLocation, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import BurgerMenuToggle from "../BurgerMenuToggle/BurgerMenuToggle";


function Navigation({ onSignInClick, isLoggedIn, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  const location = useLocation();
  const isSavedArticles = location.pathname == "/saved-news";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => setIsShowMobileMenu(!isShowMobileMenu);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`nav ${isSavedArticles ? "nav_saved" : ""}`}
    >
      <div
        className={`nav__link-container ${
          isShowMobileMenu ? "nav__link-container_menu-opened" : ""
        }`}
      >
        <span
          className={`nav__logo ${
            isSavedArticles ? "nav__logo-saved" : ""
          }`}
        >
          NewsExplorer
        </span>

        {isMobile && (
          <button
            className={`nav__menu-button ${
              isShowMobileMenu ? "nav__menu-close-btn" : ""
            } ${isSavedArticles ? "nav__menu-button-saved" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          ></button>
        )}

        <div className="nav__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav__home-link ${
                isActive ? "nav__link_active" : ""
              } ${isSavedArticles ? "nav__home-link-saved" : ""}`
            }
          >
            {({ isActive }) => (
              <div
                className={`nav__link-wrapper ${
                  isActive ? "nav__link-wrapper_active" : ""
                }`}
              >
                Home
              </div>
            )}
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `nav__saved-link ${
                    isActive ? "nav__link_active" : ""
                  } ${
                    isSavedArticles ? "nav__saved-link-saved" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`nav__link-wrapper ${
                      isActive ? "nav__link-wrapper_saved" : ""
                    }`}
                  >
                    Saved articles
                  </div>
                )}
              </NavLink>

              <button
                className={`nav__sign-out-btn ${
                  isSavedArticles ? "nav__sign-out-btn-saved" : ""
                }`}
                onClick={handleSignOut}
              >
                {currentUser?.name}
                <span
                  className={`nav__logout-icon ${
                    isSavedArticles ? "nav__logout-icon-saved" : ""
                  }`}
                ></span>
              </button>
            </>
          ) : (
            <button className="nav__sign-in-btn" onClick={onSignInClick}>
              Sign in
            </button>
          )}
        </div>
      </div>

      {/* Mini Button for 320px view */}
      <button
        className={`nav__mini-button ${
          isSavedArticles ? "nav__mini-button_black" : ""
        }`}
        onClick={() => toggleMobileMenu(true)}
        aria-label="Mini button"
      >
        Mini
      </button>

      {isMobile && (
        <BurgerMenuToggle
          onSignInClick={onSignInClick}
          isShowMobileMenu={isShowMobileMenu}
          toggleMobileMenu={toggleMobileMenu}
          handleSignout={handleSignOut}
          isLoggedIn={isLoggedIn}
          isSavedArticles={isSavedArticles}
          currentUser={currentUser}
        />
      )}
    </nav>
  );
}

export default Navigation;

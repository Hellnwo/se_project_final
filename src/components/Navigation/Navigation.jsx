import "./navigation.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Navigation({
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
}){
    const { currentUser } = useContext(CurrentUserContext);
    return(
<nav className="navigation">
        {isLoggedIn ? (
          <ul className="navigation__container">
            <li>
              <Link to="/saved-news" className="news__link">
                <p className="header__username"> {currentUser?.name} </p>
                {currentUser?.avatar ? (
                  <img
                    className="navigation__user"
                    src={currentUser?.avatar || avatar}
                    alt="user avatar"
                  />
                ) : (
                  <span className="navigation__user navigation__user_type_none">
                    {currentUser?.name?.toUpperCase().charAt(0) ||
                      avatar.charAt(0)}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navigation__container">
            <li>
              <button
                onClick={handleRegisterClick}
                className="navigation__button"
              >
                Sign Up
              </button>
            </li>
            <li>
              <button className="navigation__button" onClick={handleLoginClick}>
                Log In
              </button>
            </li>
          </ul>
        )}
      </nav>
    );
}

export default Navigation;
import "./navigation.css";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logouta from "../../assets/logouta";
import logoutb from "../../assets/logoutb";

function Navigation({
  isLoggedIn,
  handleLoginClick,
  handleSignOutClick,
}){
    const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isHomeArticles = location.pathname === "/";
  const isSavedArticles = location.pathname == "/saved-news";

    return(
<nav className={`navigation ${isSavedArticles ? "nav_news-articles-saved" : ""}`}>
  <Link to="/" className={`navigation__logo ${isSavedARticles ? "navigation__logo-saved-articles" : ""}`}>
  NewsExplorer
  </Link>
  <div className="navigation__links">
    <Link to="/" className={`navigation__links-home ${isSavedArticles ? "navigation__links-home-saved" : ""}`}>
    Home
    </Link>
    {!isLoggedIn && isHomeArticles ? (
      <button onClick={handleLoginClick} type="button" className="navigation__links-signin-btn">
        Sign in
      </button>
    ) : (
      <div className="Navigation__links-signin">
        <Link to="/saved-news" className={`navigation__links-saved-articles ${isLoggedIn && isHomeArticles ? "navigation__links-saved-articles-home" : ""}`}>
        Saved articles
        </Link>
        <button className={`navigation__links-signout-btn ${isLoggedIn && isHomeArticles ? "navigation__links-signout-btn-home" : ""}`} onClick={handleSignOutClick}>
          {currentUser.username}
          <img 
          src={isLoggedIn && isHomeArticles ? logouta : logoutb} alt="signout btn" className="Navigation__Links-btn-img"
          />
        </button>
      </div>
    )}
  </div>
      </nav>
    );
}

export default Navigation;
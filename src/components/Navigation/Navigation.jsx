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
<nav className={`nav ${isSavedArticles ? "nav_news-articles-saved" : ""}`}>
  <Link to="/" className={`nav__logo ${isSavedARticles ? "nav__logo-saved-articles" : ""}`}>
  NewsExplorer
  </Link>
  <div className="nav__links">
    <Link to="/" className={`nav__links-home ${isSavedArticles ? "nav__links-home-saved" : ""}`}>
    Home
    </Link>
    {!isLoggedIn && isHomeArticles ? (
      <button onClick={handleLoginClick} type="button" className="nav__links-signin-btn">
        Sign in
      </button>
    ) : (
      <div className="nav__links-signin">
        <Link to="/saved-news" className={`nav__links-saved-articles ${isLoggedIn && isHomeArticles ? "nav__links-saved-articles-home" : ""}`}>
        Saved articles
        </Link>
        <button className={`nav__links-signout-btn ${isLoggedIn && isHomeArticles ? "nav__links-signout-btn-home" : ""}`} onClick={handleSignOutClick}>
          {currentUser.username}
          <img 
          src={isLoggedIn && isHomeArticles ? logouta : logoutb} alt="signout btn" className="nav__Links-btn-img"
          />
        </button>
      </div>
    )}
  </div>
      </nav>
    );
}

export default Navigation;
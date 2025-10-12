import "./SavedHeader.css";
import { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedHeader({
  isLoggedIn,
  handleSignOut,
  keywords,
  savedNewsArticles = [],
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header header-saved">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <div className="header-saved__section">
        <h2 className="header-saved__title">Saved articles</h2>
        <p className="header-saved__caption">
          {currentUser.username}, you have {savedNewsArticles.length} saved articles{" "}
        </p>
        <p className="header-saved__keywords">
          By keywords:{" "}
          <span className="header-saved__span-keywords">
            {keywords.length <= 2
              ? keywords.join(", ")
              : `${keywords[0]}, ${keywords[1]}, and ${
                  keywords.length - 2
                } others`}
          </span>
        </p>
      </div>
    </header>
  );
}

export default SavedHeader;

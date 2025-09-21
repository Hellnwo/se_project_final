import "./SavedHeader.css";
import { React, useContext } from "react";
import Navigation from "../Navigation/Navigation";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedHeader({
  isLoggedIn,
  handleSignOut,
  keywords,
  savedArticles = [],
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header header__saved">
      <Navigation isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <div className="header__saved-section">
        <h2 className="header__saved-title">Saved articles</h2>
        <p className="header__saved-caption">
          {currentUser.username}, you have {savedArticles.length} saved articles{" "}
        </p>
        <p className="header__saved-keywords">
          By keywords:{" "}
          <span className="header__saved-span-keywords">
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

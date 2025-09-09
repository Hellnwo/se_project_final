import "./SavedHeader.css";
import React from "react";
import Navigation from "../Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedHeader({ isLoggedIn, handleSignOut, savedArticles = [] }) {
  const { currentUser } = useContext(CurrentUserContext);

  const keywordCounts = {};
  savedArticles.forEach((n) => {
    if (!n.keyword) {
      return;
    }
    keywordCounts[n.keyword] = (keywordCounts[n.keyword] || 0) + 1;
  });

  const sortedKeywords = Object.entries(keywordCounts)
    .sort(([, n], [, m]) => m - n)
    .map(([keyword]) => keyword);

  const formatSortedKeywords =
    sortedKeywords.length > 3
      ? '${sortedKeywords.slice(0, 3).join(", ")}, and ${sortedKeywords.length - 3} others'
      : sortedKeywords.join(", ");

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
            {" "}
            {formatSortedKeywords}{" "}
          </span>
        </p>
      </div>
    </header>
  );
}

export default SavedHeader;

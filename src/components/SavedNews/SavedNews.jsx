import "./SavedNews.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import NewsCardArticles from "../NewsCardArticles/NewsCardArticles";

function SavedNews({
  isLoggedIn,
  handleSavedNewsArticles,
  savedNewsArticles = [],
  searchedNewsArticles,
  handleDeleteNewsArticles,
  newsArticlesCounts,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="saved-news__articles">
      <NewsCardArticles
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleSavedNewsArticles={handleSavedNewsArticles}
        savedNewsArticles={savedNewsArticles}
        searchedNewsArticles={searchedNewsArticles}
        handleDeleteNewsArticles={handleDeleteNewsArticles}
        newsArticlesCounts={newsArticlesCounts}
      />
    </main>
  );
}

export default SavedNews;

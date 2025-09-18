import React, { useContext, useState } from "react";
import "./NewsCard.css";
import defaultnewsimage from "../../images/defaultimage.jpg";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../Contexts/CurrentUserContexts";

function NewsCard({ item, handleDeleteNewsArticles, handleSavedNewsArticles }) {
  console.log(item);

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const location = useLocation();
  const isHomeNewsArticlesPage = location.pathname === "/";
  const isNewsArticlesSavedPage = location.pathname === "/saved-news";

  const [bookmarkNewsCard, setBookmarkNewsCard] = useState({});

  const handleToBookmarkNewsCard = (item) => {
    if (!isLoggedIn) {
      return;
    }

    const newsCardWithBookmarked = !bookmarkNewsCard[item._id];
    setBookmarkNewsCard((prevItem) => ({
      ...prevItem,
      [item._id]: newsCardWithBookmarked,
    }));

    const bookMarkNewsCard = {
      _id: item._id,
      urlToImage: item.urlToImage,
      publishedAt: item.publishedAt,
      title: item.title,
      description: item.description,
      source: { name: item.source.name },
      keyword: item.title,
      isSaved: newsCardWithBookmarked,
    };

    handleSavedNewsArticles(bookMarkNewsCard);
  };

  return (
    <li className="newscard">
      <img
        src={item.urlToImage || defaultnewsimage}
        alt={item.description}
        className="newscard__image"
      />
      {!isLoggedIn && currentUser && isHomeNewsArticlesPage && (
        <button className="newscard__save-btn" type="button">
          <span className="newscard__save-btn-text">
            Sign in to save articles
          </span>
        </button>
      )}

      {isLoggedIn && currentUser && isHomeNewsArticlesPage && (
        <button
          className={
            bookmarkNewsCard[item._id]
              ? "newscard__btn-bookmark"
              : "newscard__btn-bookmark-black"
          }
          type="button"
          onClick={() => handleToBookmarkNewsCard(item)}
        ></button>
      )}

      {isLoggedIn && currentUser && isNewsArticlesSavedPage && (
        <div className="newscard__btn-and-keyword">
          <span className="newscard__keyword">{item.keyword}</span>
          <button
            className="newscard__btn-to-delete"
            type="button"
            onClick={() => handleDeleteNewsArticles(item)}
          >
            <span className="newscard__btn-to-delete-text">
              Removed from saved
            </span>
          </button>
        </div>
      )}

      <div className="newscard__content">
        <p className="newscard__content-date">
          {new Date(item.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h3 className="newscard__content-title">{item.title}</h3>
        <p className="newscard__content-decription">{item.description}</p>
        <p className="newscard__content-source">{item.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;

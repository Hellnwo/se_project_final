import React, { useState } from "react";
import "./SearchForum.css";

function SearchForm({ onArticleSearch }) {
    const [news, setNews] = useState("");

    const handleChange = (evt) => {
        setNews(evt.target.value);
    };

    const handleArticleSubmit = (evt) => {
        evt.preventDefault();
        if (!news.trim()) {
            return;
        }
        onArticleSearch(news);
    };

  return (
    <div className="form">
      <form action="" className="form__search" onSubmit={handleArticleSubmit}>
        <input
          type="text"
          className="form__search-input"
          placeholder="Enter Topic"
          required
          aria-label="News Search"
          id="search"
          name="search"
          value={news}
          onChange={handleChange}
        />
        <button className="form__search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;

import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onNewsArticlesSearched }) {
    const [news, setNews] = useState("");

    const handleChange = (evt) => {
        setNews(evt.target.value);
    };

    const handleArticleSubmit = (evt) => {
        evt.preventDefault();
        if (!news.trim()) {
            return;
        }
        onNewsArticlesSearched(news);
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

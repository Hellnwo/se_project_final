import "./Main.css";
import NewsCardArticles from "../NewsCardArticles/NewsCardArticles";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import Nothingfoundfull from "../../assets/Nothingfound-full.svg";

function Main({ cardList, isLoggedIn, isLoading, handleSavedNewsArticles, handleNewsArticlesCounts, searchedNewsArticles, newsArticlesCounts, handleDeleteNewsArticles, }) {
  const displayedNewsArticles = cardList.slice(0, newsArticlesCounts);
  console.log(newsArticlesCounts, displayedNewsArticles.length);
  return (
    <main className={`${searchedNewsArticles ? "main" : ""}`}>
     <section className="main__cards">
      {isLoading && <Preloader />}
      {searchedNewsArticles && displayedNewsArticles.length === 0 && (
      <div className="main__cards-not-found">
        <img 
        src={Nothingfoundfull}
        alt="Nothing Found"
        className="main__cards-not-found-img"
        />
      </div>
      )}
      {displayedNewsArticles.length > 0 && (
        <p className="main__cards-title">Search results</p>
      )}

      <ul className="main__cards-list">
        <NewsCardArticles 
        cardList={cardList}
        displayedNewsArticles={displayedNewsArticles}
        isLoggedIn={isLoggedIn}
        handleSavedNewsArticles={handleSavedNewsArticles}
        newsArticlesCounts={newsArticlesCounts}
        handleDeleteNewsArticles={handleDeleteNewsArticles}
        />
      </ul>
      {newsArticlesCounts < cardList.length && (
      <button
      className="main__cards-btn"
      onClick={handleNewsArticlesCounts}
      >
      Show more
      </button>
      )}
     </section>
     <About />
    </main>
  );
}

export default Main;
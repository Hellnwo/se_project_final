import { useEffect, useState, useContext } from "react";
import { Route, Routes, useNavigation, Navigate } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SavedHeader from "../SavedHeader/SavedHeader";
import SavedNews from "../SavedNews/SavedNews";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { signup, signin, tokenCheck } from "../../utils/auth";
import { getNewsArticles, saveNewsArticles } from "../../utils/NewsArticlesAPI";
import { defaultArticles } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchedNewsArticles, setSearchedNewsArticles] = useState(false);
  const [newsArticlesSearchedResults, setNewsArticlesSearchedResults] =
    useState([]);
  const [savedNewsArticles, setSavedNewsArticles] = useState([]);
  const [newsArticlesCounts, setNewsArticlesCounts] = useState(0);

  const navigate = useNavigate();

  function handleSearchNewsArticles(news) {
    console.log(news);
    setIsLoading(true);
    getNewsArticles({ keyword: news })
      .then((res) => {
        if (!searchedNewsArticles) {
          setSearchedNewsArticles(true);
        }
        setNewsArticlesSearchedResults(res.articles);
        setNewsArticlesCounts(3);
      })
      .catch((err) => {
        console.error("There are no articles", err);
        setNewsArticlesSearchedResults([]);
        setSearchedNewsArticles(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleSignIn = ({ email, password }) => {
    signin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        handleTokenCheck();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  function handleSavedNewsArticles(article) {
    if (!currentUser) {
      return;
    }
    const checkIfSavedNewsArticles = savedNewsArticles.some(
      (news) => news.title === article.title
    );
    console.log(checkIfSavedNewsArticles);
    if (checkIfSavedNewsArticles) {
      return;
    }
    savedNewsArticles(article).then(() => {
      console.log(article);
      console.log([...savedNewsArticles, article]);
      setSavedNewsArticles([...savedNewsArticles, article]);
    });
  }

  function handleDeleteNewsArticle(deletedArticle) {
    const filteredNewsArticles = savedNewsArticles.filter((news) => {
      console.log("this is the news", news);
      console.log("deleted", deletedArticle);
      return news.title !== deletedArticle.title;
    });
    console.log("filteredNewsArticles", filteredNewsArticles);
    setSavedNewsArticles(filteredNewsArticles);
  }

  function handleNewsArticlesCounts() {
    setNewsArticlesCounts((prevNews) => prevNews + 3);
  }
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleSignInModal = () => {
    setActiveModal("sign-in");
  };
  const handleSignUpModal = () => {
    setActiveModal("sign-up");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    const handleOverlay = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    onSignInClick={handleSignInModal}
                    onNewsArticlesSearched={handleSearchNewsArticles}
                    isLoggedIn={isLoggedIn}
                    onSignUpClick={handleSignUpModal}
                    handleSignOut={handleSignOut}
                  />
                  <Main
                    cardList={newsArticlesSearchedResults}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    handleSavedNewsArticles={handleSavedNewsArticles}
                    handleNewsArticlesCounts={handleNewsArticlesCounts}
                    searchedNewsArticles={searchedNewsArticles}
                    handleDeleteNewsArticles={handleDeleteNewsArticles}
                    newsArticlesCounts={newsArticlesCounts}
                  />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <>
                  <HeaderSavedNewsArticles
                    isLoggedIn={isLoggedIn}
                    savedNewsArticles={savedNewsArticles}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                    newsArticlesCounts={newsArticlesCounts}
                  />
                  <MainSavedNewsArticles
                    isLoggedIn={isLoggedIn}
                    savedNewsArticles={savedNewsArticles}
                    handleSavedNewsArticles={handleSavedNewsArticles}
                    handleDeleteNewsArticles={handleDeleteNewsArticles}
                    searchedNewsArticles={searchedNewsArticles}
                    handleNewsArticlesCounts={handleNewsArticlesCounts}
                    newsArticlesCounts={newsArticlesCounts}
                  />
                </>
              }
            />
          </Routes>
          <Footer />
          <SignInModal
            isOpen={activeModal === "sign-in"}
            onClose={closeActiveModal}
            onSignInClick={handleSignInModal}
            onSignUpClick={handleSignUpModal}
            handleSignIn={handleSignIn}
          />
          <SignUpModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onSignUpClick={handleSignUpModal}
            onSignInClick={handleSignInModal}
            handleSignUp={handleSignUp}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

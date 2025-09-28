import { useEffect, useState, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SavedHeader from "../SavedHeader/SavedHeader";
import SavedNews from "../SavedNews/SavedNews";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpSuccessModal from "../SignUpSucessModal/SignUpSuccessModal";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signUp, signIn, handleToken } from "../../utils/api";
import { checkFakeToken } from "../../utils/auth";
import { getArticles, saveArticles } from "../../utils/NewsAPI";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchedNewsArticles, setSearchedNewsArticles] = useState(false);
  const [newsArticlesSearchedResults, setNewsArticlesSearchedResults] =
    useState([]);
  const [savedNewsArticles, setSavedNewsArticles] = useState([]);
  const [newsArticlesCounts, setNewsArticlesCounts] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  const navigate = useNavigate();


  function handleSearchNewsArticles(news) {
    console.log("this is the news", news);
    setKeyword(news);
    setKeywords([...keywords, news]);

    setIsLoading(true);
    getArticles({ keyword: news })
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

  function handleSignIn({ email, password, username }) {
    setIsLoading(true);
    console.log({ email, password, username });
    setIsLoggedIn(true);
    setCurrentUser({ email: email, username: username });
    setIsLoading(false);
    closeActiveModal();
  }

  function handleSignUp({ email, password, username }) {
    setIsLoading(true);
    console.log({ email, password, username });
    setIsLoggedIn(true);
    setCurrentUser({ email: email, username: username });
    setIsLoading(false);
    closeActiveModal();
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setSavedNewsArticles([]);
    navigate("/");
  }

  function handleSavedNewsArticles(article) {
    if (!currentUser) {
      return;
    }
    console.log(keyword);
    const checkIfSavedNewsArticles = savedNewsArticles.some(
      (news) => news.title === article.title
    );
    console.log(checkIfSavedNewsArticles);
    if (checkIfSavedNewsArticles) {
      return;
    }

    article.keyword = keyword;
    saveArticles(article).then(() => {
      console.log(article);
      console.log([...savedNewsArticles, article]);
      setSavedNewsArticles([...savedNewsArticles, article]);
    });
  }

  function handleDeleteNewsArticles(deletedArticle) {
    const filteredNewsArticles = savedNewsArticles.filter((news) => {
      console.log("this is the news", news);
      console.log("u deleted me", deletedArticle);
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
    console.log("modal");
  };

  const handleSignUpModal = () => {
    setActiveModal("sign-up");
  };

  const handleSignUpSuccessModal = () => {
    setActiveModal("sign-up-successfully");
  };


  useEffect(() => {
    checkFakeToken().then(({ data }) => {
      setCurrentUser(data);
    });
  }, [isLoggedIn]);

 
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
console.log(activeModal);
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
                    keywords={keywords}
                    activeModal={activeModal}
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
                    keywords={keywords}
                  />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <>
                  <SavedHeader
                    isLoggedIn={isLoggedIn}
                    savedNewsArticles={savedNewsArticles}
                    handleSignOut={handleSignOut}
                    currentUser={currentUser}
                    newsArticlesCounts={newsArticlesCounts}
                    keywords={keywords}
                  />
                  <SavedNews
                    isLoggedIn={isLoggedIn}
                    savedNewsArticles={savedNewsArticles}
                    handleSavedNewsArticles={handleSavedNewsArticles}
                    handleDeleteNewsArticles={handleDeleteNewsArticles}
                    searchedNewsArticles={searchedNewsArticles}
                    handleNewsArticlesCounts={handleNewsArticlesCounts}
                    newsArticlesCounts={newsArticlesCounts}
                    keywords={keywords}
                  />
                </>
              }
            />
          </Routes>
          <Footer />
          <LoginModal
            isOpen={activeModal === "sign-in"}
            onClose={closeActiveModal}
            onSignInClick={handleSignInModal}
            onSignUpClick={handleSignUpModal}
            handleSignIn={handleSignIn}
          />
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            onSignUpClick={handleSignUpModal}
            onSignInClick={handleSignInModal}
            handleSignUp={handleSignUp}
            onSuccessfulSignUpModal={handleSignUpSuccessModal}
          />
          <SignUpSuccessModal
            isOpen={activeModal === "sign-up-successfully"}
            onClose={closeActiveModal}
            handleSignIn={handleSignIn}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;

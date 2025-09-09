import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import "./App.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

import { APIkey } from "../../utils/constants";
import {
  getItems,
  deleteCard,
  addCardLike,
  removeCardLike,
  getUserData,
} from "../../utils/api";
import { signup, signin, tokenCheck } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const openRegisterModal = () => {
    setActiveModal("sign-up");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirm");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const switchToLoginModal = () => {
    closeActiveModal();
    setActiveModal("login");
  };

  const switchToSignUpModal = () => {
    closeActiveModal();
    setActiveModal("sign-up");
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  };

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

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegisterModalSubmit = ({ email, password, name, avatarUrl }) => {
    signup(email, password, name, avatarUrl)
      .then((data) => {
       localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        handleTokenCheck();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignInModalSubmit = ({ email, password }) => {
    signin(email, password)
      .then((data) => {
        console.log(data);
        localStorage.setItem("jwt", data.token);
        getUserData().then((UserData) => {
          setCurrentUser(UserData);
          closeActiveModal();
        });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  };

  const handleDeleteBtn = (id) => {
    deleteCard(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const ProtectedRoute = ({ isloggedIn, children }) => {
    return isloggedIn ? children : <Navigate to="/" />;
  };

  return (
      <CurrentUserContext.Provider
        value={{ currentUser, isLoggedIn, handleSignOut }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              username={currentUser?.name}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={openRegisterModal}
              handleLoginClick={openLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    clothingItems={clothingItems}
                    onSignIn={handleSignIn}
                  />
                }
              />
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute isloggedIn={isLoggedIn}>
                    <SavedNews
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      username={currentUser?.name}
                      handleCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOutClick={handleSignOutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <DeleteModal
            onClose={closeActiveModal}
            isOpen={activeModal === "delete-confirm"}
            onDeleteBtn={handleDeleteBtn}
            itemId={selectedCard._id}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            switchToSignUp={switchToSignUpModal}
            onLoginSubmit={handleSignInModalSubmit}
          />
          <RegisterModal
            isOpen={activeModal === "sign-up"}
            onClose={closeActiveModal}
            switchToLogin={switchToLoginModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;

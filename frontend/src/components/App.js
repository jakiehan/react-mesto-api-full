import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js'
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/auth'

const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPreloaderBtn, setIsPreloaderBtn] = useState(false);
  const [isInfoTooltipPopupOpen, setIisInfoTooltipPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');
  const navigate = useNavigate();

  const checkJwt = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkJwt(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/');
        }).catch(err => {
        console.log(`Ошибка: ${err.message}`)
      }).finally(()=>{
        setIsAuthLoading(true);
      })
    } else {
      setIsAuthLoading(true);
    }
  }

  useEffect(() => {
    checkJwt();
  }, [])

  useEffect(() => {

    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      Promise.all([api.getUserInfo(jwt), api.getCards(jwt)])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData.reverse());
        }).catch(err => {
        console.log(`Ошибка: ${err.message}`)
      })
    }
  },[loggedIn, ])

  const handleRegister = (password, email) => {
    setIsPreloaderBtn(true);
    auth.register(password, email)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          navigate('/sign-in');
        }
      }).catch(err => {
      setIsRegistered(false);
      setIsErrorMessage(err.message);
    }).finally(() => {
      setIsPreloaderBtn(false);
      setIisInfoTooltipPopupOpen(true);
    })
  }

  const handleLogin = (password, email) => {
    setIsPreloaderBtn(true);
    auth.login(password, email)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token)
          checkJwt();
        }
      }).catch(err => {
      setIsRegistered(false);
      setIisInfoTooltipPopupOpen(true);
      setIsErrorMessage(err.message);
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleSingOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  const handleUpdateUser = (inputData) => {
    const jwt = localStorage.getItem('jwt');
    setIsPreloaderBtn(true);
    api.setUserInfo(inputData, jwt)
      .then((UserInfo) => {
        setCurrentUser(UserInfo);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${err.message}`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleUpdateAvatar = (avatarUrl) => {
    const jwt = localStorage.getItem('jwt');
    setIsPreloaderBtn(true);
    api.setUserAvatar(avatarUrl, jwt)
      .then((UserAvatar) => {
        setCurrentUser(UserAvatar);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${err.message}`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleAddPlaceSubmit = (inputData) => {
    const jwt = localStorage.getItem('jwt');
    setIsPreloaderBtn(true);
    api.uploadCard(inputData, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch(err => {
      console.log(`Ошибка: ${err.message}`)
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleCardLike = (card) => {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      }).catch(err => {
      console.log(`Ошибка: ${err.message}`);
    })
  }

  const handleCardDelete = (card) => {
    const jwt = localStorage.getItem('jwt');
    setIsPreloaderBtn(true);
    api.deleteCard(card._id, jwt)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard._id !== card._id && stateCard));
        closeAllPopups();
      }).catch(err => {
      console.log(`Не удалось удалить фото-карточку ${err.message}`);
    }).finally(() => {
      setIsPreloaderBtn(false);
    })
  }

  const handleCardClick = (card) => setSelectedCard(card);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleDeletePlaceClick = (place) => setCardToDelete(place);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIisInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setCardToDelete({});
    setIsErrorMessage('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header userEmail={userEmail} handleSingOut={handleSingOut} />
        <Routes>
          <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn} isAuthLoading={isAuthLoading}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  isCards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeletePlaceClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} isPreloader={isPreloaderBtn} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isPreloader={isPreloaderBtn} />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloader={isPreloaderBtn}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloader={isPreloaderBtn}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUploadCard={handleAddPlaceSubmit}
          isPreloader={isPreloaderBtn}
        />
        <DeletePlacePopup
          card={cardToDelete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isPreloader={isPreloaderBtn}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegistered={isRegistered}
          isMessage={isErrorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

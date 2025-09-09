import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./NewsCard.css";

function NewsCard ({ card, handleCardClick, handleCardLike }) {
  const {currentUser} = useContext(CurrentUserContext);
  const isLiked = currentUser?.id && card.likes.includes(currentUser.id);
  console.log(card, currentUser, isLiked);
  const token = localStorage.getItem('jwt');

  const itemLikeButtonClassName = `card__like-button ${isLiked ? 'card__like-button_active' : ''}`;
  const heartIcon = isLiked ? heartf : heart;
  const handleClick = () => handleCardClick(card);

  return (
    <li className="card">
      <h2 className="card__name">{card.name}
         {token && (<img className="card__like" src={heartIcon} alt={itemLikeButtonClassName} onClick={() => handleCardLike({ id: card._id, isLiked })} />)}
      </h2>
      <img className="card__image" src={card.imageUrl} alt={card.name} onClick={handleClick} />
    </li>
  );
}

export default NewsCard;

import './SavedNews.css';
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedHeader from '../SavedHeader/SavedHeader';

function SavedNews(){
  const currentUser = useContext(CurrentUserContext);

  return(
    <div>
        <section>
        <SavedHeader />
        </section>
    </div>
  );
}

export default SavedNews;
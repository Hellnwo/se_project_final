import './NewsCardArticles.css';
import NewsCard from '../NewsCard/NewsCard';
import { useLocation } from 'react-router-dom';

 function NewsCardArticles({
    cardList, newsArticlesCounts, savedNewsArticles = [], handleSavedNewsArticles, handleDeleteNewsArticles,
}) {
    const location = useLocation();
    const isNewsArticlesSavedPage = location.pathname === "/saved-news";

    const displayedNewsArticles = isNewsArticlesSavedPage ? savedNewsArticles : cardList.slice(0, newsArticlesCounts);
    console.log(cardList);
    console.log(newsArticlesCounts);

    return (
        <div className="articles__selected">
            {displayedNewsArticles.map((item, index) => {
                return (
            <NewsCard 
            handleSavedNewsArticles={handleSavedNewsArticles}
            handleDeleteNewsARticles={handleDeleteNewsArticles}
            item={item}
            key={index}
            />
            );
            })}
        </div>
    );
}

export default NewsCardArticles;
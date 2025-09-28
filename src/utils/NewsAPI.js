import { checkResponse } from "./api";
import { APIkey } from "./constants";

export const getArticles = ({ keyword }) => {
  const url =
  process.env.NODE_ENV === "production" 
  ? `https://nomoreparties.co/news/v2/everything?q=${keyword}&apikey=${APIkey}&from=${fromDate()}&to=${currentDate()}&pageSize=100`
  : `https://newsapi.org/v2/everything?q=${keyword}&apikey=${APIkey}&from=${fromDate()}&to=${currentDate()}&pageSize=100`;
  return checkResponse(url);
};

const currentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
const fromDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export function getSavedNewsArticles(article) {
  return new Promise((res) =>
    res([
      {
        _id: "68c4d6457d7da285e5d0784d",
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        title: article.title,
        description: article.description,
        source: { name: article.source.name },
        keyword: article.title,
      },
      {
        _id: "68c4d656aad483b2a7268d86",
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        title: article.title,
        description: article.description,
        source: { name: article.source.name },
        keyword: article.title,
      },
    ])
  );
}

export function saveArticles(article) {
  console.log(article);
  return new Promise((res) => {
    res({
      _id: "68c4d7a7bd725b5c7e2aa16d",
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      title: article.title,
      description: article.description,
      source: { name: article.source.name },
      keyword: article.title,
    });
  });
}

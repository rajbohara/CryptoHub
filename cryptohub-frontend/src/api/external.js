import axios from "axios";
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
// const NEWS_API_KEY = '33125d44b34844659a320d9c1e8154b4';
// process.env.REACT_APP_NEWS_API_KEY;
 
const NEWS_API_ENDPOINT = `https://saurav.tech/NewsAPI/top-headlines/category/business/in.json`;
// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`;
// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`;

const CRYPTO_API_ENDPOINT =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";


export const  getNews= async () => {
    let response;
    try {
        response = await axios.get(NEWS_API_ENDPOINT); //axios.get(NEWS_API_ENDPOINT) sends a GET request to the specified API endpoint.
        response = response.data.articles.slice(0,15); // api sends an array of articles , we are slicing the first 15 articles
    } catch (error) {
        console.log(error);
    }
   return response  ; 
}

export const getCrypto = async () => {
    let response;
  
    try {
      response = await axios.get(CRYPTO_API_ENDPOINT);
  
      response = response.data;
    } catch (error) {
        console.log(error);
    }
  
    return response;
  };
  

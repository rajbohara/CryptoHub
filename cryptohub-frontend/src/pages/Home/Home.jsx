import { useState, useEffect } from 'react';
import { getNews } from '../../api/external';
import styles from './Home.module.css';
import Loader from '../../components/Loader/Loader';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    return () => {
      setArticles([]); // cleanup
    };
  }, []);

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length === 0) {
    return <Loader text="Loading homepage..." />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        
        Trending News
      </h1>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div
            className={styles.card}
            key={article.url}
            onClick={() => handleCardClick(article.url)}
          >
            <div className={styles.imageWrapper}>
              <img src={article.urlToImage} alt={article.title} />
            </div>
            <div className={styles.content}>
              <h3>{article.title}</h3>
              <p>{article.description || "Click to read more..."}</p>
              <button className={styles.readMore}>Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

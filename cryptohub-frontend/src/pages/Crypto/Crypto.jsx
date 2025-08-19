import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getCrypto } from '../../api/external';
import styles from './Crypto.module.css';                 // keep as-is
import tableStyles from './CryptoTable.module.css';       // NEW: table-only styles

function Crypto() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('cards');     // 'cards' | 'table'

  useEffect(() => {
    (async function cryptoApiCall() {
      try {
        const response = await getCrypto();
        if (!response || !Array.isArray(response)) return;
        setData(response);
      } catch (err) {
        console.error("API call failed:", err);
      }
    })();
  }, []);

  if (data.length === 0) {
    return <Loader text="cryptocurrencies" />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Top Cryptocurrencies</h2>

      {/* Toggle (kept separate: styles come from CryptoTable.module.css) */}
      <div className={tableStyles.toggleBar} role="tablist" aria-label="View toggle">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'cards'}
          aria-pressed={viewMode === 'cards'}
          className={`${tableStyles.toggleBtn} ${viewMode === 'cards' ? tableStyles.active : ''}`}
          onClick={() => setViewMode('cards')}
        >
          Card View
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === 'table'}
          aria-pressed={viewMode === 'table'}
          className={`${tableStyles.toggleBtn} ${viewMode === 'table' ? tableStyles.active : ''}`}
          onClick={() => setViewMode('table')}
        >
          Table View
        </button>
      </div>

      {viewMode === 'cards' ? (
        // ===== Original CARD GRID (unchanged) =====
        <div className={styles.grid}>
          {data.map((coin) => (
            <div key={coin.id} className={styles.card}>
              <div className={styles.header}>
                <img src={coin.image} alt={coin.name} className={styles.logo} />
                <h3>{coin.name}</h3>
                <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
              </div>
              <div className={styles.body} style={{ paddingTop: "7px", paddingBottom: "7px" }}>
                <p><strong>Price:</strong> ${coin.current_price.toLocaleString()}</p>
                <p
                  className={
                    coin.price_change_percentage_24h < 0 ? styles.negative : styles.positive
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p className={styles.rank}>Rank #{coin.market_cap_rank}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ===== New TABLE VIEW (separate CSS) =====
        <div className={tableStyles.tableWrap}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h</th>
              </tr>
            </thead>
            <tbody>
              {data.map((coin) => (
                <tr key={coin.id}>
                  <td className={tableStyles.rankCell}>#{coin.market_cap_rank}</td>
                  <td className={tableStyles.coinCell}>
                    <img src={coin.image} alt={coin.name} className={tableStyles.logo} />
                    <div className={tableStyles.coinText}>
                      <span className={tableStyles.name}>{coin.name}</span>
                      <span className={tableStyles.symbol}>{coin.symbol.toUpperCase()}</span>
                    </div>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_24h < 0 ? tableStyles.negative : tableStyles.positive}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Crypto;

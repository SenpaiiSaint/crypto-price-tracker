import React, { useEffect, useState } from "react";
import { fetchCryptoPrices, CryptoData } from "./services/cryptoService";
import PriceCard from "./components/PriceCard";

const App: React.FC = () => {
  const [prices, setPrices] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const data = await fetchCryptoPrices();
        setPrices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadPrices();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>CryptoCurrency Price Tracker</h1>
      <div className="price-list">
          {prices.map((crypto) => (
            <PriceCard key={crypto.id} crypto={crypto} />
          ))}
      </div>
    </div>
  );
};

export default App;
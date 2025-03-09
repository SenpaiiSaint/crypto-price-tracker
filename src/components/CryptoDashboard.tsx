import { useState, useEffect } from "react";
import { fetchCryptoPrices, CryptoData } from "../services/cryptoService";
import PriceCard from "./PriceCard";
import { motion } from "motion/react";
import "./CryptoDashboard.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const CryptoDashboard: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCryptoPrices();
        setCryptos(data);
        if (data.length > 0) {
          setSelectedCrypto(data[0]);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const crypto = cryptos.find((c) => c.id === selectedId);
    if (crypto) {
      setSelectedCrypto(crypto);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <motion.div
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1>Crypto Dashboard</h1>
      <div className="select-container">
        <label htmlFor="crypto-select">Choose a cryptocurrency:</label>
        <select id="crypto-select" onChange={handleSelectChange}>
          {cryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </div>
      {selectedCrypto && <PriceCard crypto={selectedCrypto} />}
    </motion.div>
  );
};

export default CryptoDashboard;

import React, { useEffect, useState } from "react";
import { fetchCryptoPrices, CryptoData } from "./services/cryptoService";
import PriceCard from "./components/PriceCard";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
   
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ padding: "20px" }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        CryptoCurrency Price Tracker
      </motion.h1>
      <motion.div
        className="price-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {prices.map((crypto) => (
            <motion.div key={crypto.id} variants={itemVariants}>
              <PriceCard crypto={crypto} />
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default App;
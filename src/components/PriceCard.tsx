import React from "react";
import { CryptoData } from "../services/cryptoService";

interface PriceCardProps {
    crypto: CryptoData;
}

const PriceCard: React.FC<PriceCardProps> = ({ crypto }) => {
    return (
        <div className="price-card">
            <h3>
                {crypto.name} ({crypto.symbol.toUpperCase()})
            </h3>
            <p>${crypto.price.toFixed(2)}</p>
        </div>
    );
};

export default PriceCard;
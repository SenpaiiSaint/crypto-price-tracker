// Handles API calls and data processing 

export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    price: number;
}

export const fetchCryptoPrices = async (): Promise<CryptoData[]> => {
    const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
    );
    if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
    }
    const data = await response.json();
    return data.map((item: any) => ({
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        price: item.current_price,
    }));
};


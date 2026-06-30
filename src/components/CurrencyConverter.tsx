import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import axios from "axios";

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

interface ExchangeRates {
  [key: string]: number;
}

export function CurrencyConverter() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [rates, setRates] = useState<ExchangeRates>({ USD: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferred_currency");
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }

    const cachedRates = localStorage.getItem("exchange_rates");
    const cacheTimestamp = localStorage.getItem("exchange_rates_timestamp");

    if (cachedRates && cacheTimestamp) {
      const hoursSinceCache = (Date.now() - parseInt(cacheTimestamp)) / (1000 * 60 * 60);
      if (hoursSinceCache < 24) {
        setRates(JSON.parse(cachedRates));
        return;
      }
    }

    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
      const fetchedRates: ExchangeRates = {
        USD: 1,
        EUR: response.data.rates.EUR,
        GBP: response.data.rates.GBP,
        AUD: response.data.rates.AUD,
        CAD: response.data.rates.CAD,
      };
      setRates(fetchedRates);
      localStorage.setItem("exchange_rates", JSON.stringify(fetchedRates));
      localStorage.setItem("exchange_rates_timestamp", Date.now().toString());
    } catch (error) {
      setRates({
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        AUD: 1.53,
        CAD: 1.36,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    localStorage.setItem("preferred_currency", currency);
    window.dispatchEvent(new CustomEvent("currencyChange", { detail: { currency, rates } }));
  };

  return (
    <Select value={selectedCurrency} onValueChange={handleCurrencyChange} disabled={loading}>
      <SelectTrigger className="w-28 h-9 text-xs gap-1">
        <DollarSign className="h-3 w-3" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code} className="text-xs">
            {currency.code} ({currency.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function convertPrice(amountUSD: number, currency?: string, rates?: ExchangeRates): string {
  const selectedCurrency = currency || localStorage.getItem("preferred_currency") || "USD";
  const exchangeRates = rates || JSON.parse(localStorage.getItem("exchange_rates") || '{"USD": 1}');

  const rate = exchangeRates[selectedCurrency] || 1;
  const converted = amountUSD * rate;

  const currencyObj = currencies.find((c) => c.code === selectedCurrency);
  const symbol = currencyObj?.symbol || "$";

  return `${symbol}${Math.round(converted).toLocaleString()}`;
}

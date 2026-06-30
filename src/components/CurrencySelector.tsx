import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "TZS", symbol: "TSh", rate: 2500 },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

export function CurrencySelector({ value, onChange, className }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-20 h-8 text-xs ${className || ""}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((c) => (
          <SelectItem key={c.code} value={c.code} className="text-xs">
            {c.code} ({c.symbol})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function convertCurrency(amountUSD: number, targetCurrency: string): string {
  const curr = currencies.find((c) => c.code === targetCurrency) || currencies[0];
  const converted = amountUSD * curr.rate;
  if (curr.code === "TZS") return `${curr.symbol} ${converted.toLocaleString()}`;
  return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

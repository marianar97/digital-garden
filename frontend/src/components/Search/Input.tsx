import { ChangeEvent } from "react";

interface InputProps {
  value: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ value, handleSearch }: InputProps) {
  return (
    <div>
      <input
        value={value}
        onChange={handleSearch}
        className="h-9 w-full rounded-md border border-input bg-red px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="text"
        placeholder="Search AI resources..."
      />
    </div>
  );
}

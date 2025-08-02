import { MouseEvent } from "react";

interface ButtonProps {
  handleSearch: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ handleSearch }: ButtonProps) {
  return (
    <button
      className="h-9 rounded-md border border-input bg-black px-6 text-white hover:bg-gray-800 transition-colors"
      onClick={handleSearch}
    >
      Search
    </button>
  );
}

import SearchBar from "./SearchBar"
import TagSelector from "./TagSelector"

export default function Search({ onSearch, tags, onTagChange }: { onSearch: (query: string) => void, tags: any[], onTagChange: (tags: any[]) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SearchBar onSearch={onSearch} />
      <TagSelector onTagChange={onTagChange} tags={tags} />
    </div>
  );
}
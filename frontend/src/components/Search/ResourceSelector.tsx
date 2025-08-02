import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import TagSelector from "./TagSelector";

export default function ResourceSelector({
  onTypeChange,
  onSearch,
  onTagChange,
  tags,
}: {
  onTypeChange: (type: string) => void;
  onSearch: (search: string) => void;
  onTagChange: (tags: any[]) => void;
  tags: any[];
}) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row my-0 items-center justify-between p-0 md:p-2 gap-4 border-none">
        <SearchBar onSearch={onSearch} />
        <Dropdown onTypeChange={onTypeChange} initialSelected={null} />
      </div>
      <TagSelector onTagChange={onTagChange} tags={tags} />
    </>
  );
}

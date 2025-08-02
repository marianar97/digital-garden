import { useState } from "react";

export default function TagSelector({ onTagChange, tags }: { onTagChange: (tags: any[]) => void, tags: any[] }) {
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const handleTagClick = (tag: any) => {
    let newSelectedTags: any[];
    
    if (selectedTags.includes(tag)) {
      // Remove tag if already selected
      newSelectedTags = selectedTags.filter(t => t !== tag);
    } else {
      // Add tag if not selected
      newSelectedTags = [...selectedTags, tag];
    }
    
    setSelectedTags(newSelectedTags);
    onTagChange(newSelectedTags);
  };

  return (
    <div className="flex flex-row gap-2 flex-wrap mb-5 items-start justify-start ">
      {tags.map((tag) => (
        <div 
          key={tag} 
          onClick={() => handleTagClick(tag)} 
          className={`cursor-pointer rounded-full px-2 py-1 border border-gray-200 transition-colors duration-200 ${
            selectedTags.includes(tag) 
              ? 'bg-green-800 text-white border-green-800' 
              : 'hover:bg-gray-100'
          }`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
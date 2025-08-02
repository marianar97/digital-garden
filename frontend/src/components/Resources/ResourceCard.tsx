import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResourceCard({
  title,
  description,
  image,
  url,
  tags,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
}) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button 
      onClick={handleClick}
      className="min-w-[280px] w-[280px] flex-shrink-0 text-left p-0 border-0 bg-transparent group"
    >
      {/* Main Card */}
      <Card className="bg-white border-none transition-all duration-300 cursor-pointer overflow-hidden rounded-b-none relative">
        <div className="relative overflow-hidden">
          {/* Header Image */}
          <img
            src={image}
            alt={`${title} - ${description}`}
            className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges - Positioned on top of the image */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-end space-x-2 px-2 z-10">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-green-800/90 text-white hover:bg-green-900 px-3 py-0.5 text-xs font-medium backdrop-blur-sm transform transition-transform duration-300 group-hover:translate-y-[-4px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Bottom Info Bar */}
      <div className="bg-gray-900 rounded-b-xl px-4 py-3 flex flex-col h-[80px]">
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold text-base line-clamp-3 overflow-hidden transform transition-transform duration-300 group-hover:translate-x-1">{title}</h3>
        </div>
      </div>
    </button>
  );
}

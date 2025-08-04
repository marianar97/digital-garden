import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";


export default function ResourceCard({
  title,
  description,
  image,
  url,
  tags,
}: {
  title: string;
  description?: string;
  image: string;
  url: string;
  tags: string[];
}) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      className="min-w-[280px] w-[280px] flex-shrink-0 text-left p-0 border-0 bg-transparent"
    >
      {/* Main Card */}
      <Card className="bg-white border-none cursor-pointer overflow-hidden rounded-b-none relative">
        <div className="relative overflow-hidden">
          {/* Header Image */}
          <motion.img
            src={image}
            alt={`${title} - ${description}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="w-full h-[180px] object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.png';
            }}
          />

          {/* Badges - Positioned on top of the image */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-end space-x-2 px-2 z-10">
            {tags.map((tag) => (
              <motion.div
                key={tag}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <Badge
                  className="bg-green-800/90 text-white hover:bg-green-900 px-3 py-0.5 text-xs font-medium backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Bottom Info Bar */}
      <div className="bg-gray-900 rounded-b-xl px-4 py-3 flex flex-col h-[80px]">
        <div className="flex flex-col space-y-2">
          <motion.h3
            whileHover={{ x: 4 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="text-white font-semibold text-base line-clamp-3 overflow-hidden"
          >
            {title}
          </motion.h3>
        </div>
      </div>
    </motion.button>
  );
}

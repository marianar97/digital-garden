import ResourceCard from "./ResourceCard";
import { motion, AnimatePresence } from "framer-motion";


interface Resource {
  id: string;
  title: string;
  description?: string;
  image: string;
  url: string;
  tags: string[];
  type: string;
}

export default function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      className="flex flex-row w-full gap-10 flex-wrap pb-4 justify-center md:justify-between"
      layout
    >
      <AnimatePresence mode="popLayout">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
              duration: 0.5,
              ease: "easeOut"
            }}
            layout
            layoutId={resource.id}
          >
            <ResourceCard {...resource} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

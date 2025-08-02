import ResourceSelector from "../Search/ResourceSelector";
import ResourceGrid from "./ResourceGrid";
import { useState } from "react";

enum ResourceType {
  VIDEO = "video",
  BOOK = "book",
  TOOL = "tool",
}

enum TagType {
  HISTORY = "History",
  GROWTH = "Growth",
  DETERMINATION = "Determination",
  ENTREPRENEURSHIP = "Entrepreneurship",
  COMMUNICATION = "Communication",
  PRODUCTIVITY = "Productivity",
  NEURODIVERSITY = "Neurodiversity",
  STARTUP = "Startup",
  PROGRAMMING = "Programming",
  CURIOSITY = "Curiosity",
}

interface Resource {
  id: string;
  title: string;
  description?: string;
  image: string;
  url: string;
  tags: TagType[];
  type: ResourceType;
}

// Default resources if none are provided
const defaultResources: Resource[] = [
  {
    id: "1",
    title: "Churchill's Speech: You shall never surrender",
    description:
      "Churchill's Speech: We shall fight on the beaches, we shall never surrender",
    image:
      "https://www.hollywoodreporter.com/wp-content/uploads/2018/01/4106_d049_00189_r_crop_-_h_2017.jpg",
    url: "https://www.youtube.com/watch?v=CXIrnU7Y_RU",
    tags: [TagType.HISTORY, TagType.GROWTH, TagType.DETERMINATION],
    type: ResourceType.VIDEO,
  },
  {
    id: "2",
    title: "Peter Thiel: Zero to One",
    description: "Startup advice from Peter Thiel",
    image: "https://m.media-amazon.com/images/I/51zGCdRQXOL._SL1200_.jpg",
    url: "https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296",
    tags: [
      TagType.ENTREPRENEURSHIP,
      TagType.STARTUP,
    ],
    type: ResourceType.BOOK,
  },
  {
    id: "3",
    title: "The power of habit",
    description: "Description 2",
    image: "https://m.media-amazon.com/images/I/71eoUH2EngL._SY522_.jpg",
    url: "https://www.amazon.com/gp/product/1400069289/",
    tags: [
      TagType.PRODUCTIVITY,
      TagType.GROWTH,
    ],
    type: ResourceType.BOOK,
  },
  {
    id: "4",
    title: "Think Fast, Talk Smart: Communication Techniques",
    description:
      "Stanford Communication technique conference from the book Think Fast, Talk Smart",
    image: "https://i.ytimg.com/vi/HAnw168huqA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=HAnw168huqA&t=94s",
    tags: [
      TagType.GROWTH,
      TagType.COMMUNICATION,
    ],
    type: ResourceType.VIDEO,
  },
  {
    id: "5",
    title: "Speechify: Listen to any website",
    description: "Speechify reads website",
    image: "https://www.vidnoz.com/bimg/speechify-text-to-speech.jpg",
    url: "https://speechify.com/",
    tags: [
      TagType.PRODUCTIVITY,
      TagType.NEURODIVERSITY,
    ],
    type: ResourceType.TOOL,
  },
  {
    id: "6",
    title: "Flow: types whatever you say",
    description: "Description 2",
    image:
      "https://store-images.s-microsoft.com/image/apps.40749.13908841991970612.40536875-f2f0-4bda-90ba-7f257692767b.e2e21593-028d-4a03-9030-a6a5cd48c229?h=307",
    url: "https://wisprflow.ai/",
    tags: [
      TagType.PRODUCTIVITY,
      TagType.NEURODIVERSITY,
    ],
    type: ResourceType.TOOL,
  },
  {
    id: "7",
    title: "Burn Rate: Launching a Startup and Losing My Mind",
    description:
      "Andy Dunn - Burn Rate: Launching a Startup and Losing My Mind",
    image:
      "https://m.media-amazon.com/images/I/31-DRNx+rvL._SY445_SX342_ControlCacheEqualizer_.jpg",
    url: "https://nextbigideaclub.com/magazine/burn-rate-launching-startup-losing-mind-bookbite/34643/",
    tags: [
      TagType.STARTUP,
      TagType.GROWTH,
    ],
    type: ResourceType.BOOK,
  },
  {
    id: "8",
    title: "Is ADHD Bad For Programming?",
    description: "ThePrimeagen: Is ADHD Bad For Programming?",
    image: "/thepm.png",
    url: "https://www.youtube.com/watch?v=bdNJgUYeYPk&list=LL&index=3",
    tags: [
      TagType.GROWTH,
      TagType.PROGRAMMING,
    ],
    type: ResourceType.VIDEO,
  },
  {
    id: "9",
    title: "First Principles Method Explained by Elon Musk",
    description: "First Principles Method Explained by Elon Musk",
    image: "/first-principles.png",
    url: "https://www.youtube.com/watch?v=NV3sBlRgzTI&t=44s",
    tags: [
      TagType.STARTUP,
      TagType.NEURODIVERSITY,
    ],
    type: ResourceType.VIDEO,
  },
  {
    id: "10",
    title: "Be Curious",
    description: "Be Curious",
    image: "/curious-gene.png",
    url: "https://www.youtube.com/watch?v=HhPZ7yx8ttg",
    tags: [
      TagType.GROWTH,
      TagType.CURIOSITY,
    ],
    type: ResourceType.VIDEO,
  },
];

export default function Resources({
  SampleResources = defaultResources,
}: {
  SampleResources?: any[];
}) {
  const [filteredResources, setFilteredResources] = useState(SampleResources);

  // Handle resource type change
  const handleTypeChange = (type: string) => {
    const tmpResources = SampleResources.filter((resource: any) => {
      if (!type || type === "all") return true;
      return resource.type === type;
    });
    setFilteredResources(tmpResources);
  };
  const handleSearch = (search: string) => {
    const tmpResources = SampleResources.filter((resource: any) => {
      if (!search || search === "") return true;
      return resource.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredResources(tmpResources);
  };

  const handleTagChange = (selectedTags: TagType[]) => {
    const tmpResources = SampleResources.filter((resource: any) => {
      if (selectedTags.length === 0) return true;
      // Check if resource has ALL selected tags (AND logic)
      return selectedTags.every(tag => resource.tags.includes(tag));
    });
    setFilteredResources(tmpResources);
  };

  return (
    <div className="flex flex-col w-full md:w-[90%] border-none rounded-lg items-start ">
      <ResourceSelector
        onTypeChange={handleTypeChange}
        onSearch={handleSearch}
        onTagChange={handleTagChange}
        tags={Object.values(TagType)}
      />
      <ResourceGrid resources={filteredResources} />
    </div>
  );
}

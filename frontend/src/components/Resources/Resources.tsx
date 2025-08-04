import ResourceSelector from "../Search/ResourceSelector";
import ResourceGrid from "./ResourceGrid";
import { useState, useEffect, useRef } from "react";
import { apiService, ApiResource } from "../../services/api";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

enum ResourceType {
  VIDEO = "Video",
  BOOK = "Book",
  TOOL = "Tool",
  ARTICLE = "Article",
}

enum TagType {
  HISTORY = "History",
  GROWTH = "Growth",
  DETERMINATION = "Determination",
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
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to convert API resource to frontend resource
function convertApiResource(apiResource: ApiResource): Resource {
  return {
    ...apiResource,
    image: apiResource.image || '/placeholder.png', // Default image if none provided
    tags: (apiResource.tags || []).map((tag: string) => tag as TagType).filter((tag: TagType) => Object.values(TagType).includes(tag)),
    type: apiResource.type as ResourceType,
    createdAt: new Date(apiResource.createdAt),
    updatedAt: new Date(apiResource.updatedAt),
  };
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
  SampleResources?: Resource[];
}) {
  const [resources, setResources] = useState<Resource[]>(SampleResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(SampleResources);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Fetch resources from API on component mount
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiResources = await apiService.getResources();
        console.log('apiResources', apiResources);
        const convertedResources = apiResources.map(convertApiResource);
        setResources(convertedResources);
        console.log('convertedResources', convertedResources);
        setFilteredResources(convertedResources);
      } catch (err) {
        console.error('Failed to fetch resources:', err);
        setError('Failed to load resources from server. Using default resources.');
        // Keep using default resources on error
        setResources(SampleResources);
        setFilteredResources(SampleResources);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [SampleResources]);

  // Initialize entrance animations on mount - only once
  useEffect(() => {
    if (hasAnimated.current || loading) return;

    // Set hasAnimated immediately to prevent double animations
    hasAnimated.current = true;

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      if (!containerRef.current || !selectorRef.current || !gridRef.current) return;

      const tl = gsap.timeline();

      // Animate container with fade in and slight slide up
      tl.fromTo(containerRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      )
        // Then stagger animation for selector and grid
        .fromTo([selectorRef.current, gridRef.current],
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
          },
          "-=0.3" // Start slightly before container animation finishes
        );
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading]); // Only trigger when loading state changes

  // Animate error message
  useEffect(() => {
    if (!errorRef.current || !error) return;

    gsap.fromTo(errorRef.current,
      {
        opacity: 0,
        y: -10,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );
  }, [error]);

  // Handle resource type change
  const handleTypeChange = (type: string) => {
    const tmpResources = resources.filter((resource: Resource) => {
      if (!type || type === "all") return true;
      // Map dropdown values to enum values
      const typeMap: { [key: string]: ResourceType } = {
        "video": ResourceType.VIDEO,
        "book": ResourceType.BOOK,
        "tool": ResourceType.TOOL,
        "article": ResourceType.ARTICLE,
      };
      const mappedType = typeMap[type.toLowerCase()];
      return resource.type === mappedType;
    });
    setFilteredResources(tmpResources);
  };

  const handleSearch = (search: string) => {
    const tmpResources = resources.filter((resource: Resource) => {
      if (!search || search === "") return true;
      return resource.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredResources(tmpResources);
  };

  const handleTagChange = (selectedTags: TagType[]) => {
    const tmpResources = resources.filter((resource: Resource) => {
      if (selectedTags.length === 0) return true;
      // Check if resource has ALL selected tags (AND logic)
      return selectedTags.every(tag => resource.tags.includes(tag));
    });
    setFilteredResources(tmpResources);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full md:w-[90%] border-none rounded-lg items-start"
    >
      {error && (
        <div
          ref={errorRef}
          className="w-full mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded"
        >
          {error}
        </div>
      )}

      <div ref={selectorRef} className="w-full relative z-50">
        <ResourceSelector
          onTypeChange={handleTypeChange}
          onSearch={handleSearch}
          onTagChange={handleTagChange}
          tags={Object.values(TagType)}
        />
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-8">
          <div className="text-gray-500 animate-pulse">Loading resources...</div>
        </div>
      ) : (
        <div ref={gridRef} className="w-full relative z-10">
          <ResourceGrid resources={filteredResources} />
        </div>
      )}
    </div>
  );
}

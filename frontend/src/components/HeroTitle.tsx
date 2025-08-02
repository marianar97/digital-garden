import { useState } from "react";
import SplitText from "./TextAnimations/SplitText/SplitText";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import TagSelector from "./Search/TagSelector";

// Tag options for the form
const availableTags = [
  "History", "Growth", "Determination", "Entrepreneurship", 
  "Communication", "Productivity", "Neurodiversity", "Startup", 
  "Programming", "Curiosity"
];
import {
  NestedDialog,
  NestedDialogContent,
  NestedDialogDescription,
  NestedDialogFooter,
  NestedDialogHeader,
  NestedDialogTitle,
} from "./ui/nested-dialog";

export default function HeroTitle() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    url: "",
    tags: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (selectedTags: string[]) => {
    setFormData(prev => ({ ...prev, tags: selectedTags }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch('http://localhost:3001/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1),
          url: formData.url,
          tags: formData.tags
        }),
      });

      if (response.ok) {
        setSubmitMessage("🌱 Resource planted successfully!");
        setFormData({ title: "", type: "", url: "", tags: [] });
        setTimeout(() => {
          setDialogOpen(false);
          setSubmitMessage("");
        }, 2000);
      } else {
        const errorData = await response.json();
        setSubmitMessage(`Error: ${errorData.error || 'Failed to plant resource'}`);
      }
    } catch (error) {
      setSubmitMessage("Error: Unable to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-8">
      {/* Main title - responsive sizing */}
      <SplitText
        text="🌱 Digital Garden"
        className="text-5xl md:text-7xl font-semibold text-center"
        delay={100}
        duration={2}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />

      {/* Subtitle */}
      <div className="text-center max-w-2xl">

        {/* Interactive CTA Button */}
        <InteractiveHoverButton
          className="text-base md:text-lg font-medium bg-[rgb(109,186,24)] text-white hover:bg-[rgb(49,83,13)] hover:border-[rgb(49,83,13)] shadow-lg hover:shadow-xl transition-colors duration-300"
          onClick={() => setDialogOpen(true)}
        >
          Plant your own seed
        </InteractiveHoverButton>
      </div>

      <NestedDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <NestedDialogContent className="max-w-md">
          <NestedDialogHeader>
            <NestedDialogTitle>🌱 Plant Your Seed</NestedDialogTitle>
            <NestedDialogDescription>
              Add a new resource to help the Digital Garden grow.
            </NestedDialogDescription>
          </NestedDialogHeader>

          <div className="space-y-4 py-4">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title of resource:
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter resource title"
              />
            </div>

            {/* Type Select */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Type of resource:
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select type</option>
                <option value="Video">Video</option>
                <option value="Article">Article</option>
                <option value="Book">Book</option>
                <option value="Tool">Tool</option>
              </select>
            </div>

            {/* Tags Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tags (optional):
              </label>
              <TagSelector 
                onTagChange={handleTagChange}
                tags={availableTags}
              />
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium">
                URL:
              </label>
              <input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {submitMessage && (
            <div className={`text-sm text-center ${submitMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {submitMessage}
            </div>
          )}

          <NestedDialogFooter>
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.title || !formData.type || !formData.url || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-[rgb(109,186,24)] rounded-md hover:bg-[rgb(49,83,13)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Planting..." : "Plant Seed"}
            </button>
          </NestedDialogFooter>
        </NestedDialogContent>
      </NestedDialog>
    </div>
  );
}

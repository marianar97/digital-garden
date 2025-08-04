import HeroTitle from "./components/HeroTitle";
import Resources from "./components/Resources/Resources";
import { useState } from "react";
import { ResourcesProvider } from "./contexts/ResourcesContext";

function App() {
  const [showResources, setShowResources] = useState(false);
  return (
    <ResourcesProvider>
      <div className="flex flex-col w-full items-center justify-content min-h-screen py-8">
        <HeroTitle onLetterAnimationComplete={() => {
          setShowResources(true);
        }} />
        {showResources && <Resources />}
      </div>
    </ResourcesProvider>
  );
}

export default App;

import HeroTitle from "./components/HeroTitle";
import Resources from "./components/Resources/Resources";

function App() {
  const [showResources, setShowResources] = useState(false);
  return (
    <div className="flex flex-col w-full items-center justify-content min-h-screen py-8">
      <HeroTitle onLetterAnimationComplete={() => {
        setShowResources(true);
      }} />
      {showResources && <Resources />}
    </div>
  );
}

export default App;

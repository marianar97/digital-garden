import HeroTitle from "./components/HeroTitle";
import Resources from "./components/Resources/Resources";

function App() {
  return (
    <div className="flex flex-col w-full items-center justify-content min-h-screen py-8">
      <HeroTitle />
      <Resources/>
    </div>
  );
}

export default App;

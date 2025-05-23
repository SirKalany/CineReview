import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-screen-lg mx-auto p-8 text-center font-sans text-gray-900 dark:text-white dark:bg-[#242424] min-h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-24 p-6 transition drop-shadow-md hover:drop-shadow-[0_0_2em_#646cffaa]"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-24 p-6 animate-spin transition hover:drop-shadow-[0_0_2em_#61dafbaa]"
            style={{ animationDuration: "20s" }}
          />
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-6">Vite + React</h1>

      <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow mb-6">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded border border-transparent px-4 py-2 text-base font-medium bg-neutral-200 dark:bg-[#1a1a1a] hover:border-[#646cff] focus:outline-4"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="font-mono">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-gray-500">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;

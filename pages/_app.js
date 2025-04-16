import { useState, createContext } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const ThemeContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`relative min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-white"
            : "bg-gradient-to-br from-white via-gray-200 to-blue-100 text-black"
        }`}
      >
        {/* Glow background */}
        <div className="absolute inset-0 pointer-events-none z-0" />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-start w-full px-4 pt-6 pb-28 gap-y-8 text-center z-10">
          <Component {...pageProps} />
        </main>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all text-sm sm:text-base z-20"
        >
          {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Global CSS override to remove borders and shadows */}
        <style jsx global>{`
          * {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
        `}</style>
      </div>
    </ThemeContext.Provider>
  );
}

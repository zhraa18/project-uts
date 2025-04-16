"use client";
import Image from 'next/image';
import { useEffect, useState, useContext } from "react";
import AboutSection from "../components/AboutSection";
import Skills from "../components/skills";
import ProjectTimeline from "../components/project";
import Contact from "../components/contact";
import RatingSection from "../components/RatingSection";
import { ThemeContext } from "./_app";
import WeatherCard from "../components/WeatherCard";



export default function Home() {
  const text = "Welcome to My Portfolio!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
        }, 1000);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center group transition-colors duration-500 pt-24 sm:pt-28 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 text-white"
          : "bg-gradient-to-br from-white via-gray-200 to-blue-100 text-black"
      }`}
    >
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400 before:via-pink-500 before:to-purple-500 before:opacity-0 group-hover:before:opacity-30 before:blur-3xl before:animate-glow transition-opacity duration-700 z-0" />

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center py-10 md:py-20 px-6 z-10 w-full max-w-6xl gap-6">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md mb-2 ${
              theme === "dark" ? "text-blue-400" : "text-pink-600"
            }`}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-base sm:text-lg mt-1 mx-auto md:mx-0">
            Let's explore my work, skills, and projects!
          </p>
        </div>


       {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative group w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64">
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              className="object-cover rounded-full shadow-lg z-10 transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <section id="about" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
        <AboutSection />
      </section>

      <section id="skills" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
        <Skills />
      </section>

      <section id="project" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
        <ProjectTimeline />
      </section>

      <section id="contact" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
        <Contact />
      </section>

      <section id="rating" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
        <RatingSection />
      </section>

      <section id="rating" className="py-16 px-4 w-full z-10 max-w-6xl mx-auto">
      <WeatherCard />
      </section>
  


      {/* Global CSS */}
      <style jsx global>{`
        @keyframes ringRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-ring {
          animation: ringRotate 6s linear infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

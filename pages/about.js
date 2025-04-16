"use client";
import React, { useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../pages/_app"; // atau sesuaikan path jika berbeda

export default function AboutSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1, transition: { duration: 0.8 } });
    } else {
      controls.start({ scale: 0.95, opacity: 0.6, transition: { duration: 0.5 } });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ scale: 0.95, opacity: 0.6 }}
      className="h-auto flex flex-col items-center justify-start px-6 py-10 gap-6"
    >
      {/* Kucing Lucu */}
      <div className="relative -mb-8 z-20">
        <img 
          src="/kucing.png" 
          alt="Cute Cat" 
          className="w-24 md:w-32 h-auto animate-bounce"
        />
      </div>

      {/* Kotak Biodata */}
      <div
        className={`
          rounded-3xl p-8 pt-16 max-w-4xl w-full shadow-xl border relative z-10
          ${theme === "dark" 
            ? "bg-gray-800 border-blue-400"
            : "bg-white border-pink-500"
          }
        `}
      >
        <h1
          className={`
            text-3xl font-bold text-center mb-4
            ${theme === "dark" ? "text-blue-400" : "text-pink-600"}
          `}
        >
          About Me
        </h1>
        <p className={`text-lg leading-relaxed text-center ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Hello! I'm <span className="font-semibold">Fatimah Zahra</span>, a passionate{" "}
          <span className={theme === "dark" ? "text-blue-300" : "text-pink-500"}>Front-End Developer</span> based in Indonesia. 
          I am 21 years old and love creating beautiful and functional web experiences. 
          When I’m not coding, I enjoy{" "}
          <span className={theme === "dark" ? "text-blue-300" : "text-pink-500"}>
            designing interfaces, reading science fiction
          </span>, and exploring new technologies to improve my skills. 
          Let's build something amazing together!
        </p>
      </div>
    </motion.div>
  );
}

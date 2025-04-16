"use client";
import React, { useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../pages/_app";
import Image from 'next/image';

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
        <Image 
          src="/kucing.png" 
          alt="Cute Cat" 
          width={96} // setara dengan w-24
          height={96} // sesuaikan tinggi agar tidak stretched, bisa juga pakai auto layout
          className="md:w-32 h-auto animate-bounce"
        />
      </div>

      {/* Kotak Biodata */}
      <div
        className={`
          rounded-3xl p-6 pt-16 w-full max-w-[90vw] sm:max-w-xl md:max-w-3xl shadow-xl border relative z-10
          ${theme === "dark" 
            ? "bg-gray-800 border-blue-400"
            : "bg-white border-pink-500"
          }
        `}
      >
        <h1
          className={`
            text-2xl sm:text-3xl font-bold text-center mb-4
            ${theme === "dark" ? "text-blue-400" : "text-pink-600"}
          `}
        >
          About Me
        </h1>
        <p className={`text-base sm:text-lg leading-relaxed text-center break-words ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Hello! I&apos;m <span className="font-semibold">Fatimah Zahra</span>, a passionate{" "}
          <span className={theme === "dark" ? "text-blue-300" : "text-pink-500"}>Front-End Developer</span> based in Indonesia. 
          I am 21 years old and love creating beautiful and functional web experiences. 
          When I’m not coding, I enjoy{" "}
          <span className={theme === "dark" ? "text-blue-300" : "text-pink-500"}>
            designing interfaces, reading science fiction
          </span>, and exploring new technologies to improve my skills. 
          Let&apos;s build something amazing together!
        </p>
      </div>
    </motion.div>
  );
}

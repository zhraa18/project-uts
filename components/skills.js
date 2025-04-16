import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const aiToolsLeft = [
  { name: "Next Js", status: "", active: true },
  { name: "PHP", status: "", active: true },
  { name: "Tailwind Css", status: "", active: true },
  { name: "Figma", status: "", active: true },
];

const aiToolsRight = [
  { name: "CSS", status: "", active: true },
  { name: "HTML", status: "", active: true },
  { name: "Java Script", status: "", active: true },
  { name: "My SQL", status: "", active: true },
];

export default function Skills() {
  return (
    <div className="relative w-full py-20 flex justify-center items-center via-slate-900 to-black text-white">
      <h2 className="absolute top-10 text-3xl font-semibold text-center">
        My Skills
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-20">
  {/* Kiri */}
        <div className="flex flex-col gap-6">
          {aiToolsLeft.map((tool, idx) => (
            <ToolCard key={idx} {...tool} align="left" delay={idx * 0.2} />
          ))}
        </div>

        {/* Tengah */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-indigo-600 flex items-center justify-center text-3xl md:text-4xl font-bold z-10 my-8 md:my-0">
          {/* Garis horizontal */}
          <div className="absolute w-[300px] h-px bg-white opacity-10 z-0" />
        </div>

        {/* Kanan */}
        <div className="flex flex-col gap-6">
          {aiToolsRight.map((tool, idx) => (
            <ToolCard key={idx} {...tool} align="right" delay={idx * 0.2} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolCard({ name, status, active, align, delay }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: -20 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center justify-${
        align === "left" ? "start" : "end"
      } gap-2 w-56 ${!active ? "opacity-40" : ""}`}
    >
      {align === "right" && <ToolButton />}
      <div className="bg-slate-800 px-3 py-2 rounded-lg flex flex-col text-sm w-full">
        <span>{name}</span>
        {status && <span className="text-xs text-gray-400">{status}</span>}
      </div>
      {align === "left" && <ToolButton />}
    </motion.div>
  );
}

function ToolButton() {
  return (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-600">
      <FaPlus className="text-xs" />
    </div>
  );
}

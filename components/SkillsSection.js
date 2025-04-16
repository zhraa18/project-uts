import { useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../pages/_app"; // Pastikan path ini benar
import ToolButton from "./ToolButton"; // Asumsinya kamu punya komponen ini

function ToolCard({ name, status, active, align, delay }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { theme } = useContext(ThemeContext); // ⬅️ Gunakan ThemeContext

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: -20 });
    }
  }, [inView, controls]);

  const cardClasses =
    theme === "dark"
      ? "bg-slate-800 text-white"
      : "bg-pink-200 text-pink-900 border border-pink-300";

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
      <div
        className={`px-3 py-2 rounded-lg flex flex-col text-sm w-full transition-colors duration-300 ${cardClasses}`}
      >
        <span className="font-medium">{name}</span>
        {status && <span className="text-xs text-gray-500">{status}</span>}
      </div>
      {align === "left" && <ToolButton />}
    </motion.div>
  );
}

export default ToolCard;

import React, { useEffect, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { ThemeContext } from "../pages/_app"; // ⬅️ Pastikan path ini sesuai

const projects = [
  {
    id: "Skripsi",
    title: "Skripsi | Skripsi online with headline",
    description: "Prototyping Website base of Next JS",
    link: "https://skripsi-online-eight.vercel.app/",
    image: "/1.jpg",
    tags: ["NEXT JS"],
  },
  {
    id: "OSP",
    title: "On scroll project of portfolio",
    description: "Prototyping Website base of Next JS",
    link: "https://on-scroll.vercel.app/",
    image: "/2.jpg",
    tags: ["NEXT JS"],
  },
  {
    id: "CVF",
    title: "CV-F |Cv online Fatimah Zahra",
    description: "Prototyping Website base of Next JS.",
    link: "https://cv-online-sage.vercel.app/",
    image: "/3.jpg",
    tags: ["NEXT JS"],
  },
];

const ProjectCard = ({ project }) => {
  const router = useRouter();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.9 });
    }
  }, [inView, controls]);

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const tagBg = theme === "dark" ? "bg-black/40 text-white" : "bg-gray-200 text-black";

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gray rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer shadow-md hover:shadow-lg ${textColor}`}
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-60 rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-2"
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm mb-4">{project.description}</p>
        <p className="text-sm mb-2 text-blue-500 dark:text-blue-400">Link: {project.link}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${tagBg}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectTimeline = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <div className="min-h-screen px-6 py-16 bg-transparent">
      <h2 className={`text-3xl font-bold text-center mb-12 ${textColor}`}>
        My Project
      </h2>
      <div className="max-w-4xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;

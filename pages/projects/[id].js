import { useRouter } from "next/router";
import React from "react";

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
    title: "CV-F | Cv online Fatimah Zahra",
    description: "Prototyping Website base of Next JS.",
    link: "https://cv-online-sage.vercel.app/",
    image: "/3.jpg",
    tags: ["NEXT JS"],
  },
];

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16 text-white bg-transparent flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg mb-6"
        />
        <p className="text-base mb-4">{project.description}</p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline block mb-4"
        >
          Visit Website
        </a>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-white/10 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => router.back()}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}

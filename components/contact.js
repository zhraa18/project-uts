import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { ThemeContext } from "../pages/_app"; // Pastikan path ini benar

export default function Contact() {
  const { theme } = useContext(ThemeContext); // Gunakan theme
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch('/api/comments');
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });

    if (res.ok) {
      setName('');
      setEmail('');
      setMessage('');
      fetchComments();
    }
  };

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const placeholderColor = theme === "dark" ? "placeholder-white/70" : "placeholder-black/50";
  const inputBg = theme === "dark" ? "bg-white/10 border-white/20" : "bg-gray-100 border-gray-300";
  const commentBg = theme === "dark" ? "bg-white/10 border-white/20" : "bg-gray-100 border-gray-300";
  const commentText = theme === "dark" ? "text-white/80" : "text-black/70";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 pt-32 transition-colors duration-500 ${textColor}`}>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        Contact Me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-lg text-center max-w-xl mb-10 ${textColor}`}
      >
        I'd love to hear from you! Whether you have a question or just want to say hi — feel free to reach out through any platform below.
      </motion.p>

      <motion.div
        className="flex gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a href="mailto:your@email.com" className="bg-white text-black p-3 rounded-full hover:scale-110 transition" aria-label="Email"><Mail className="w-6 h-6" /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-black p-3 rounded-full hover:scale-110 transition" aria-label="LinkedIn"><Linkedin className="w-6 h-6" /></a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-white text-black p-3 rounded-full hover:scale-110 transition" aria-label="GitHub"><Github className="w-6 h-6" /></a>
      </motion.div>

      {/* Form */}
      <motion.form
        className="w-full max-w-lg space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${textColor} ${placeholderColor} ${inputBg}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${textColor} ${placeholderColor} ${inputBg}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${textColor} ${placeholderColor} ${inputBg}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Send Message
        </button>
      </motion.form>

      {/* Display Comments */}
      <div className="mt-12 w-full max-w-xl text-left">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length === 0 ? (
          <p className={`${textColor}/70`}>No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className={`p-4 rounded-lg ${commentBg}`}>
                <p className="font-semibold text-pink-500">{c.name}</p>
                <p className={commentText}>{c.message}</p>
                <p className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

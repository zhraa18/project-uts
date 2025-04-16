import { useState, useContext } from "react";
import Link from "next/link";
import { Home, User, Code, Briefcase, Phone } from "lucide-react";
import { useRouter } from "next/router";
import { ThemeContext } from "../pages/_app";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const navItems = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/about", label: "About", icon: <User size={18} /> },
    { href: "/skills", label: "Skills", icon: <Code size={18} /> },
    { href: "/project", label: "Project", icon: <Briefcase size={18} /> },
    { href: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4">
      <div className="mx-auto max-w-5xl">
        <div
          className={`rounded-full shadow-lg py-2 px-4 flex justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-4 items-center overflow-x-auto sm:overflow-visible backdrop-blur-md transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-black border border-gray-300"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors duration-300 whitespace-nowrap ${
                router.pathname === item.href
                  ? theme === "dark"
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-pink-200 text-pink-700 font-semibold"
                  : theme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-pink-100"
              }`}
            >
              {item.icon}
              <span className="ml-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

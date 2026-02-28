import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-12 border-t ${darkMode ? 'bg-zinc-950 border-zinc-900 text-white' : 'bg-white border-zinc-100 text-zinc-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold text-gradient mb-4 block">
              Eyaderaddis.
            </a>
            <p className={`max-w-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Building high-quality digital experiences with passion and precision.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="#about" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>About</a>
            <a href="#projects" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Projects</a>
            <a href="#services" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Services</a>
            <a href="#contact" className={`text-sm font-medium hover:text-indigo-500 transition-colors ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-indigo-600'}`}>
              <Github size={20} />
            </a>
            <a href="#" className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-indigo-600'}`}>
              <Linkedin size={20} />
            </a>
            <a href="#" className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-zinc-900 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:text-indigo-600'}`}>
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800/10">
          <p className={`text-sm mb-4 md:mb-0 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
            &copy; {currentYear} Eyaderaddis Beleta Azazh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className={`text-sm flex items-center gap-1.5 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Addis Ababa
            </p>
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-zinc-900 text-zinc-500 hover:text-white' : 'bg-zinc-100 text-zinc-400 hover:text-indigo-600'}`}
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

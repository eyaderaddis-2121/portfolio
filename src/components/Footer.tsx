import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socials = [
  { icon: <Github    size={20} />, href: 'https://github.com/eyaderaddis-2121',  label: 'GitHub' },
  { icon: <Linkedin  size={20} />, href: 'https://linkedin.com',                   label: 'LinkedIn' },
  { icon: <Twitter   size={20} />, href: '#',                                       label: 'Twitter' },
  { icon: <Instagram size={20} />, href: '#',                                       label: 'Instagram' },
];

export const Footer = () => {
  return (
    <footer className="py-12 theme-transition
                       bg-slate-900 text-white
                       dark:bg-[#060D1A] dark:border-t dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div>
            <a href="#home" className="text-2xl font-bold gradient-text">
              Eyader.
            </a>
            <p className="mt-4 max-w-xs text-slate-400 dark:text-slate-500">
              Building the future of software, one line of code at a time.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center
                             transition-all duration-300 theme-transition
                             bg-slate-800 dark:bg-slate-800/60
                             hover:bg-blue-600 dark:hover:bg-blue-600 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-600">
              &copy; {new Date().getFullYear()} Eyader Addis Belete. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

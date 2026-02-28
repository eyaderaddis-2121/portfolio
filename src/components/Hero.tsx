import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, ExternalLink } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden ${
        darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
      }`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${
                darkMode ? 'bg-zinc-800 text-indigo-400 border border-zinc-700' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}
            >
              Available for Freelance
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              I'm <span className="text-gradient">Eyaderaddis</span> <br />
              Beleta Azazh
            </h1>
            <h2 className={`text-2xl md:text-3xl font-medium mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Full Stack Developer & UI/UX Enthusiast
            </h2>
            <p className={`text-lg mb-10 max-w-xl leading-relaxed ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Crafting high-performance, scalable web applications with a focus on clean code and exceptional user experiences. Let's turn your vision into reality.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
              >
                Hire Me <ArrowRight size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2 border transition-all ${
                  darkMode ? 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800' : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                View Projects
              </motion.a>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className={`transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-indigo-600'}`}>
                <Github size={24} />
              </a>
              <a href="#" className={`transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-indigo-600'}`}>
                <Linkedin size={24} />
              </a>
              <a href="#" className={`transition-colors ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-indigo-600'}`}>
                <ExternalLink size={24} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src="https://picsum.photos/seed/developer/800/800"
                alt="Eyaderaddis Beleta Azazh"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className={`absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl z-20 ${
                darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                  5+
                </div>
                <div>
                  <p className="font-bold text-lg">Years Experience</p>
                  <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Professional Development</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

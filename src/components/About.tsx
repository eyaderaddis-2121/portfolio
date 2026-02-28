import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const highlights = [
    '5+ Years of Full Stack Experience',
    'Expert in React & Node.js Ecosystem',
    'Passionate about UI/UX Design',
    'Committed to Clean & Scalable Code',
    'Strong Problem Solving Skills',
    'Fluent in English & Amharic',
  ];

  return (
    <section
      id="about"
      className={`py-24 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/about/800/1000"
                alt="About Me"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] ${darkMode ? 'bg-indigo-500/20' : 'bg-indigo-500/10'}`} />
            <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[80px] ${darkMode ? 'bg-purple-500/20' : 'bg-purple-500/10'}`} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I am a dedicated Full Stack Developer with a passion for building scalable web applications that solve real-world problems. My journey in tech started with a curiosity for how things work, which evolved into a career focused on delivering high-quality software.
            </p>
            <p className={`text-lg mb-10 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have extensive experience with MySQL and PostgreSQL. My commitment to clean code and performance ensures that the applications I build are not only functional but also maintainable and efficient.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-indigo-500 shrink-0" size={20} />
                  <span className={`font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors"
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image + Theme-Aware Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/hero-bg-30d0a651-1783622981570.webp"
          alt="Software Engineering Background"
          className="w-full h-full object-cover"
        />
        {/* Light mode: soft white wash */}
        <div className="absolute inset-0 bg-white/82 backdrop-blur-[2px] dark:hidden" />
        {/* Dark mode: deep navy overlay so the bg image doesn't overwhelm text */}
        <div className="absolute inset-0 hidden dark:block"
             style={{ background: 'linear-gradient(135deg, rgba(11,17,32,0.93) 0%, rgba(17,24,39,0.88) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Availability badge */}
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border
                           bg-blue-50    text-blue-600    border-blue-100
                           dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30 theme-transition">
            Available for new opportunities
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight
                         text-slate-900 dark:text-slate-50 theme-transition">
            Hi, I'm{' '}
            <span className="gradient-text">Eyaderaddis Belete</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium mb-4
                        text-slate-700 dark:text-slate-200 theme-transition">
            Software Engineering Student | Aspiring Full-Stack Developer
          </p>

          <p className="max-w-2xl mx-auto text-lg mb-10 leading-relaxed
                        text-slate-600 dark:text-slate-400 theme-transition">
            Practical experience in developing web applications using JavaScript, React.js,
            Node.js, Express.js, and database technologies. Interested in frontend &amp; backend
            development, REST API integration, and building user-focused software solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/Eyaderaddis_Belete_CV.pdf"
              download="Eyaderaddis_Belete_CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all
                         bg-blue-600 text-white shadow-lg shadow-blue-200/50
                         hover:bg-blue-700
                         dark:bg-blue-600 dark:text-white dark:shadow-blue-500/20
                         dark:hover:bg-blue-500 theme-transition"
            >
              Download CV <Download size={18} />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all
                         bg-white text-slate-900 border border-slate-200 shadow-sm
                         hover:bg-slate-50
                         dark:bg-slate-800/80 dark:text-slate-100 dark:border-slate-700
                         dark:hover:bg-slate-700 dark:shadow-none theme-transition"
            >
              Contact Me <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 rounded-full flex justify-center p-1
                        border-slate-400 dark:border-slate-600 theme-transition">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full
                       bg-slate-400 dark:bg-slate-500 theme-transition"
          />
        </div>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-24 section-white theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Eyaderaddis Belete"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback to a professional avatar placeholder if photo not found
                  (e.currentTarget as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=Eyaderaddis+Belete&size=600&background=1e3a5f&color=ffffff&bold=true&font-size=0.33";
                }}
              />
            </div>
            {/* Decorative glows */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-blue-600 dark:text-blue-400 font-semibold mb-4 tracking-wider uppercase text-sm theme-transition">
              About Me
            </h2>
            <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-50 theme-transition">
              Passionate about building software that makes an impact
            </h3>

            <div className="space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 theme-transition">
              <p>
                I am a Software Engineering student at <strong className="text-slate-800 dark:text-slate-200">Wollo University</strong> with
                practical experience in developing web applications using JavaScript, React.js,
                Node.js, Express.js, and database technologies.
              </p>
              <p>
                Interested in frontend &amp; backend development, REST API integration, and building
                user-focused software solutions. My career interests span Full-Stack Web Development,
                Frontend &amp; Backend Engineering, Artificial Intelligence, and Machine Learning.
              </p>
              <p>
                Problem-solving and analytical thinking, communication &amp; teamwork, motivation &amp; commitment,
                and continuous learning are the professional strengths I bring to every project.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="p-4 rounded-2xl border theme-transition
                              bg-slate-50 border-slate-100
                              dark:bg-slate-800/60 dark:border-slate-700">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3+</p>
                <p className="text-xs uppercase tracking-wide mt-1
                              text-slate-500 dark:text-slate-400">Years Learning</p>
              </div>
              <div className="p-4 rounded-2xl border theme-transition
                              bg-slate-50 border-slate-100
                              dark:bg-slate-800/60 dark:border-slate-700">
                <p className="text-3xl font-bold text-teal-500 dark:text-teal-400">6+</p>
                <p className="text-xs uppercase tracking-wide mt-1
                              text-slate-500 dark:text-slate-400">Projects Built</p>
              </div>
              <div className="p-4 rounded-2xl border theme-transition
                              bg-slate-50 border-slate-100
                              dark:bg-slate-800/60 dark:border-slate-700">
                <p className="text-3xl font-bold text-indigo-500 dark:text-indigo-400">3</p>
                <p className="text-xs uppercase tracking-wide mt-1
                              text-slate-500 dark:text-slate-400">Languages</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

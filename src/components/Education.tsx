import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const certificates = [
  { title: 'Web Development',    issuer: 'Full Stack Mastery' },
  { title: 'Python Programming', issuer: 'Data Science Academy' },
  { title: 'JavaScript',         issuer: 'Advanced JS Institute' },
  { title: 'Cloud Computing',    issuer: 'Cloud Infrastructure' },
];

export const Education = () => {
  return (
    <section id="education" className="py-24 section-white theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Education ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 rounded-2xl theme-transition
                              bg-blue-50 dark:bg-blue-500/10">
                <GraduationCap className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold theme-transition
                             text-slate-900 dark:text-slate-50">
                Education
              </h3>
            </div>

            <div className="relative pl-8 space-y-12
                            border-l-2 border-slate-100 dark:border-slate-700 theme-transition">
              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 shadow-sm
                                bg-blue-600 border-white dark:border-[#0B1120] theme-transition" />
                <span className="text-sm font-semibold mb-1 block theme-transition
                                 text-blue-600 dark:text-blue-400">
                  Ongoing
                </span>
                <h4 className="text-xl font-bold mb-1 theme-transition
                               text-slate-900 dark:text-slate-50">
                  Bachelor of Science in Software Engineering
                </h4>
                <p className="font-semibold mb-2 theme-transition
                              text-teal-600 dark:text-teal-400">
                  Wollo University — Ethiopia
                </p>
                <p className="leading-relaxed theme-transition
                              text-slate-600 dark:text-slate-400">
                  Focusing on software architecture, data structures, algorithms, and advanced web
                  technologies. Participating in various technical clubs and research projects.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Certificates ── */}
          <motion.div
            id="certificates"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 rounded-2xl theme-transition
                              bg-teal-50 dark:bg-teal-500/10">
                <Award className="text-teal-500 dark:text-teal-400" size={32} />
              </div>
              <h3 className="text-3xl font-bold theme-transition
                             text-slate-900 dark:text-slate-50">
                Certificates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border group transition-all theme-transition
                             bg-slate-50 border-slate-100
                             hover:border-teal-200
                             dark:bg-[#172033] dark:border-slate-700/60
                             dark:hover:border-teal-500/40"
                >
                  <h4 className="font-bold mb-1 transition-colors theme-transition
                                 text-slate-900 dark:text-slate-50
                                 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                    {cert.title}
                  </h4>
                  <p className="text-sm theme-transition
                                text-slate-500 dark:text-slate-400">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Terminal, Trophy } from 'lucide-react';

const experiences = [
  {
    role: 'Software Engineering Student',
    company: 'University Program',
    period: '2022 - Present',
    icon: <Briefcase className="text-blue-600 dark:text-blue-400" />,
    description: 'Mastering core principles of software development, algorithms, and system design.',
  },
  {
    role: 'Open Source Contributor',
    company: 'GitHub Community',
    period: '2023 - Present',
    icon: <Code className="text-teal-500 dark:text-teal-400" />,
    description: 'Contributing to various open-source projects, improving code quality and adding new features.',
  },
  {
    role: 'Academic Projects',
    company: 'Individual & Group',
    period: '2022 - 2024',
    icon: <Terminal className="text-indigo-600 dark:text-indigo-400" />,
    description: 'Developed multiple full-stack applications as part of the academic curriculum.',
  },
  {
    role: 'Hackathon Participant',
    company: 'Various Events',
    period: '2023 - 2024',
    icon: <Trophy className="text-emerald-500 dark:text-emerald-400" />,
    description: 'Collaborated in high-pressure environments to build innovative solutions in short timeframes.',
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 section-white theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-semibold mb-4 tracking-wider uppercase text-sm theme-transition
                         text-blue-600 dark:text-blue-400">
            Journey
          </h2>
          <h3 className="text-4xl font-bold theme-transition
                         text-slate-900 dark:text-slate-50">
            Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 p-8 rounded-3xl border theme-transition
                         bg-slate-50 border-slate-100
                         dark:bg-[#172033] dark:border-slate-700/60"
            >
              {/* Icon container */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center theme-transition
                              bg-white dark:bg-slate-800">
                {exp.icon}
              </div>

              <div>
                {/* Period badge */}
                <span className="text-sm font-semibold px-3 py-1 rounded-full mb-3 inline-block theme-transition
                                 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10">
                  {exp.period}
                </span>
                <h4 className="text-xl font-bold mb-1 theme-transition
                               text-slate-900 dark:text-slate-50">
                  {exp.role}
                </h4>
                <p className="font-medium mb-3 theme-transition
                              text-slate-500 dark:text-slate-400">
                  {exp.company}
                </p>
                <p className="leading-relaxed theme-transition
                              text-slate-600 dark:text-slate-400">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

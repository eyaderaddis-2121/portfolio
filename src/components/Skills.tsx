import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, Terminal, Wrench, Globe } from 'lucide-react';

const skills = [
  {
    category: 'Frontend',
    icon: <Code2 className="text-blue-600 dark:text-blue-400" />,
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: <Server className="text-teal-500 dark:text-teal-400" />,
    items: ['Node.js', 'Express.js', 'Python', 'Django', 'DRF'],
  },
  {
    category: 'Databases',
    icon: <Database className="text-indigo-600 dark:text-indigo-400" />,
    items: ['MySQL', 'Firebase', 'MariaDB'],
  },
  {
    category: 'Languages',
    icon: <Terminal className="text-emerald-500 dark:text-emerald-400" />,
    items: ['Java', 'JavaScript', 'Python', 'Dart'],
  },
  {
    category: 'Tools',
    icon: <Wrench className="text-slate-600 dark:text-slate-400" />,
    items: ['Git', 'GitHub', 'VS Code', 'npm', 'Postman'],
  },
  {
    category: 'Mobile',
    icon: <Globe className="text-purple-500 dark:text-purple-400" />,
    items: ['Flutter (learning)'],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 section-alt theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-semibold mb-4 tracking-wider uppercase text-sm theme-transition
                         text-blue-600 dark:text-blue-400">
            Skills &amp; Expertise
          </h2>
          <h3 className="text-4xl font-bold theme-transition
                         text-slate-900 dark:text-slate-50">
            Technical Toolkit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl shadow-sm hover:shadow-md transition-all theme-transition
                         bg-white border border-slate-100
                         dark:bg-[#172033] dark:border-slate-700/60 dark:hover:border-slate-600"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl theme-transition
                                bg-slate-50 dark:bg-slate-800/60">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-bold theme-transition
                               text-slate-900 dark:text-slate-50">
                  {skill.category}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full text-sm font-medium border theme-transition
                               bg-slate-50 text-slate-700 border-slate-100
                               dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

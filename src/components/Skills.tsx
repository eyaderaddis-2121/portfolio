import React from 'react';
import { motion } from 'motion/react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const skills: Skill[] = [
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 92, category: 'Frontend' },
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
    { name: 'Bulma CSS', level: 85, category: 'Frontend' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Express.js', level: 90, category: 'Backend' },
    { name: 'MySQL', level: 85, category: 'Database' },
    { name: 'SQLite', level: 80, category: 'Database' },
    { name: 'REST APIs', level: 92, category: 'Backend' },
    { name: 'TypeScript', level: 85, category: 'Frontend' },
  ];

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section
      id="skills"
      className={`py-24 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}
          >
            I've mastered a diverse set of technologies to build comprehensive web solutions from front to back.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
              className={`p-8 rounded-3xl border ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'
              } shadow-xl`}
            >
              <h3 className="text-xl font-bold mb-8 text-indigo-500">{category}</h3>
              <div className="space-y-6">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className={`font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                          {skill.name}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

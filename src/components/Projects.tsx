import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Tena Story Digital',
    description: 'Multilingual digital child-health education platform covering hygiene, nutrition, first aid, sanitation, and water safety. Built as a full-stack featured project.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-hospital-mgmt-3bcddd19-1783622980615.webp',
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
    github: 'https://github.com/eyaderaddis-2121',
    demo: 'https://hysterical-tena-story-kids.base44.app',
    featured: true,
  },
  {
    title: 'Belete Construction Website',
    description: 'Professional construction company website with live demo, showcasing services, portfolio, and contact information with modern responsive design.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-portfolio-b856c624-1783622981240.webp',
    tech: ['React.js', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/eyaderaddis-2121',
    demo: 'https://betete-pro-copy-78e97cdb.base44.app/',
    featured: false,
  },
  {
    title: 'DessieMART',
    description: 'Supermarket web application associated with three branches in Dessie, providing product listings, cart management, and branch-specific inventory.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-ecommerce-df39b256-1783622981428.webp',
    tech: ['React.js', 'Tailwind CSS'],
    github: 'https://github.com/eyaderaddis-2121',
    demo: '#',
    featured: false,
  },
  {
    title: 'Amazon Clone',
    description: 'E-commerce application featuring product catalog, shopping cart, and payment integration — a full-stack clone replicating core Amazon functionality.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-ecommerce-df39b256-1783622981428.webp',
    tech: ['React.js', 'Node.js', 'Firebase', 'Stripe'],
    github: 'https://github.com/eyaderaddis-2121',
    demo: '#',
    featured: false,
  },
  {
    title: 'Ethiopian Voting Application',
    description: 'Digital voting application project enabling secure, transparent online voting with Django REST Framework backend and MySQL/MariaDB storage.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-employee-mgmt-fcee0bbb-1783622981130.webp',
    tech: ['React.js', 'Tailwind CSS', 'Django REST', 'MySQL'],
    github: 'https://github.com/eyaderaddis-2121',
    demo: '#',
    featured: false,
  },
  {
    title: 'Student Academic Performance System',
    description: 'Academic group project developed collaboratively — a system for tracking, analyzing, and reporting student academic performance across subjects.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d7a5e73-4790-4f22-b7c7-9a260298f847/project-student-portal-f8d80a12-1783622980820.webp',
    tech: ['Python', 'Django', 'MySQL'],
    github: 'https://github.com/ALEXU932/Student_accademic_performances-',
    demo: '#',
    featured: false,
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 section-alt theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-semibold mb-4 tracking-wider uppercase text-sm theme-transition
                         text-blue-600 dark:text-blue-400">
            Portfolio
          </h2>
          <h3 className="text-4xl font-bold theme-transition
                         text-slate-900 dark:text-slate-50">
            Featured Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group rounded-3xl overflow-hidden shadow-sm hover:shadow-xl
                         transition-all duration-300 theme-transition
                         bg-white border border-slate-100
                         dark:bg-[#172033] dark:border-slate-700/60
                         dark:hover:border-slate-600 dark:hover:shadow-black/40"
            >
              {/* Project image with hover overlay */}
              <div className="relative aspect-video overflow-hidden">
                {project.featured && (
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold
                                  bg-blue-600 text-white shadow-lg">
                    Featured
                  </div>
                )}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                flex items-end p-6">
                  <div className="flex gap-3 w-full">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                       className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 border
                                  bg-white/20 backdrop-blur-md text-white border-white/30
                                  hover:bg-white/30 transition-colors text-sm">
                      <Github size={16} /> Code
                    </a>
                    {project.demo !== '#' ? (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                         className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2
                                    bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    ) : (
                      <span className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2
                                       bg-slate-700/60 text-slate-400 text-sm cursor-not-allowed">
                        <ExternalLink size={16} /> No Demo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 theme-transition
                               text-slate-900 dark:text-slate-50">
                  {project.title}
                </h4>
                <p className="text-sm mb-4 line-clamp-2 theme-transition
                              text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t}
                          className="px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold
                                     theme-transition
                                     bg-slate-100 text-slate-500
                                     dark:bg-slate-800 dark:text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

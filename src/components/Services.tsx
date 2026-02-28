import React from 'react';
import { motion } from 'motion/react';
import { Layout, Server, Database, Code, Smartphone, Zap } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicesProps {
  darkMode: boolean;
}

const Services: React.FC<ServicesProps> = ({ darkMode }) => {
  const services: Service[] = [
    {
      title: 'Frontend Development',
      description: 'Building responsive, pixel-perfect, and interactive user interfaces using modern frameworks like React and Tailwind CSS.',
      icon: <Layout className="text-indigo-500" size={32} />,
    },
    {
      title: 'Backend Development',
      description: 'Developing robust and scalable server-side logic, RESTful APIs, and microservices with Node.js and Express.',
      icon: <Server className="text-purple-500" size={32} />,
    },
    {
      title: 'Full Stack Web Apps',
      description: 'End-to-end development of complex web applications, integrating frontend, backend, and databases seamlessly.',
      icon: <Code className="text-pink-500" size={32} />,
    },
    {
      title: 'Database Design',
      description: 'Designing efficient and optimized database schemas using MySQL, PostgreSQL, or NoSQL solutions like MongoDB.',
      icon: <Database className="text-emerald-500" size={32} />,
    },
    {
      title: 'Mobile Responsive Design',
      description: 'Ensuring your application looks and functions perfectly across all devices, from desktops to smartphones.',
      icon: <Smartphone className="text-blue-500" size={32} />,
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing web applications for maximum speed, scalability, and high-performance user experiences.',
      icon: <Zap className="text-yellow-500" size={32} />,
    },
  ];

  return (
    <section
      id="services"
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
            My <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}
          >
            I provide a wide range of professional services to help you build and scale your digital products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-3xl border transition-all hover:shadow-2xl hover:shadow-indigo-500/10 ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'
              }`}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className={`leading-relaxed ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

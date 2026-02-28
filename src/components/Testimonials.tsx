import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  darkMode: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ darkMode }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section
      id="testimonials"
      className={`py-24 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            Client <span className="text-gradient">Testimonials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}
          >
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 rounded-3xl border relative ${
                  darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'
                }`}
              >
                <Quote className="absolute top-8 right-8 text-indigo-500/20" size={60} />
                <p className={`text-lg mb-8 italic relative z-10 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

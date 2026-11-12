import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { submitContact } from '../services/api';
import type { ContactPayload } from '../services/api';

const contactItems = [
  { icon: <Mail className="text-blue-600 dark:text-blue-400" />,     label: 'Email',    value: 'Eyaderaddisbelete@gmail.com',     href: 'mailto:Eyaderaddisbelete@gmail.com' },
  { icon: <Phone className="text-teal-500 dark:text-teal-400" />,    label: 'Phone',    value: '+251 955 545 463',                href: 'tel:+251955545463' },
  { icon: <Linkedin className="text-blue-700 dark:text-blue-400" />, label: 'LinkedIn', value: 'Eyaderaddis Belete',              href: 'https://linkedin.com/in/eyaderaddisbelete' },
  { icon: <Github className="text-slate-900 dark:text-slate-200" />, label: 'GitHub',   value: 'eyaderaddis-2121',                href: 'https://github.com/eyaderaddis-2121' },
  { icon: <MapPin className="text-red-500 dark:text-red-400" />,     label: 'Location', value: 'Ethiopia',                       href: '#' },
];

interface FormData extends ContactPayload {}

export const Contact = () => {
  const [formData, setFormData]       = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading]         = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    try {
      const res = await submitContact(formData);
      toast.success(res.message || 'Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const apiErr = err as Error & { status?: number; data?: { errors?: { path: string; msg: string }[]; message?: string } };
      if (apiErr.status === 422 && apiErr.data?.errors) {
        const errors: Partial<FormData> = {};
        apiErr.data.errors.forEach(e => { errors[e.path as keyof FormData] = e.msg; });
        setFieldErrors(errors);
        toast.error('Please fix the errors below.');
      } else if (apiErr.status === 429) {
        toast.error('Too many messages. Please wait 15 minutes before trying again.');
      } else {
        toast.error(apiErr.data?.message || 'Could not reach the server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 section-alt theme-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-semibold mb-4 tracking-wider uppercase text-sm theme-transition
                         text-blue-600 dark:text-blue-400">
            Get in Touch
          </h2>
          <h3 className="text-4xl font-bold theme-transition
                         text-slate-900 dark:text-slate-50">
            Contact Me
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — contact channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold mb-6 theme-transition
                           text-slate-900 dark:text-slate-50">
              Let's talk about your project
            </h4>
            <p className="text-lg mb-10 leading-relaxed theme-transition
                          text-slate-600 dark:text-slate-400">
              I'm always open to discussing new projects, creative ideas or opportunities to
              be part of your visions. Feel free to reach out through any of the following channels.
            </p>

            <div className="space-y-4">
              {contactItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-2xl border group
                             transition-all theme-transition
                             bg-white border-slate-100 hover:shadow-md
                             dark:bg-[#172033] dark:border-slate-700/60
                             dark:hover:border-slate-600 dark:hover:shadow-black/30"
                >
                  <div className="p-3 rounded-xl transition-colors theme-transition
                                  bg-slate-50 group-hover:bg-blue-50
                                  dark:bg-slate-800/60 dark:group-hover:bg-blue-500/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider theme-transition
                                  text-slate-500 dark:text-slate-500">
                      {item.label}
                    </p>
                    <p className="font-medium theme-transition
                                  text-slate-900 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl shadow-sm border theme-transition
                       bg-white border-slate-100
                       dark:bg-[#172033] dark:border-slate-700/60"
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 theme-transition
                                    text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all theme-transition
                               bg-white text-slate-900 placeholder-slate-400
                               focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                               dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500
                               dark:focus:border-blue-500
                               ${fieldErrors.name ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 theme-transition
                                    text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all theme-transition
                               bg-white text-slate-900 placeholder-slate-400
                               focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                               dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500
                               dark:focus:border-blue-500
                               ${fieldErrors.email ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                  />
                  {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 theme-transition
                                  text-slate-700 dark:text-slate-300">
                  Subject
                </label>
                <input
                  required
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all theme-transition
                             bg-white text-slate-900 placeholder-slate-400
                             focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                             dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500
                             dark:focus:border-blue-500
                             ${fieldErrors.subject ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                />
                {fieldErrors.subject && <p className="mt-1 text-xs text-red-500">{fieldErrors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 theme-transition
                                  text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none theme-transition
                             bg-white text-slate-900 placeholder-slate-400
                             focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                             dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder-slate-500
                             dark:focus:border-blue-500
                             ${fieldErrors.message ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                />
                {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2
                           transition-all theme-transition
                           bg-blue-600 text-white shadow-lg shadow-blue-200/50
                           hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed
                           dark:shadow-blue-500/10 dark:hover:bg-blue-500"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

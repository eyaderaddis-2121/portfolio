import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Failed to send message');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
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
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-white shadow-lg shadow-indigo-500/5'}`}>
                  <Mail className="text-indigo-500" size={24} />
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Email Me</p>
                  <p className="text-lg font-bold">eyaderaddisbelete@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-white shadow-lg shadow-indigo-500/5'}`}>
                  <Phone className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Call Me</p>
                  <p className="text-lg font-bold">+251 9XX XXX XXX</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${darkMode ? 'bg-zinc-900' : 'bg-white shadow-lg shadow-indigo-500/5'}`}>
                  <MapPin className="text-pink-500" size={24} />
                </div>
                <div>
                  <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Location</p>
                  <p className="text-lg font-bold">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
              <h4 className="text-xl font-bold mb-4">Follow Me</h4>
              <p className={`mb-6 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                Stay connected with me on social media for the latest updates and projects.
              </p>
              <div className="flex gap-4">
                {['Github', 'Linkedin', 'Twitter', 'Upwork'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                    }`}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`p-10 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className={`mb-8 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium px-1">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-6 py-4 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium px-1">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-6 py-4 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium px-1">Subject</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={`w-full px-6 py-4 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium px-1">Your Message</label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className={`w-full px-6 py-4 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none ${
                        darkMode ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                      <AlertCircle size={18} /> {errorMessage}
                    </div>
                  )}

                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className={`w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {status === 'loading' ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

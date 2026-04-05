import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, AlertCircle, CheckCircle2, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (formState.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const destinationEmail = "giorgos_M000@hotmail.com";
    const subject = encodeURIComponent(`New portfolio message from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 500);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'giorgos_M000@hotmail.com', href: 'mailto:giorgos_M000@hotmail.com', color: 'bg-[var(--accent-pink)]' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Je0Dev', color: 'bg-[var(--accent-purple)]', hoverColor: 'hover:text-[var(--accent-pink)]' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', color: 'bg-[var(--accent-blue)]', hoverColor: 'hover:text-[var(--accent-cyan)]' },
    { icon: ExternalLink, label: 'GitLab', href: 'https://gitlab.com/mag30-admin', color: 'bg-[var(--accent-yellow)]', hoverColor: 'hover:text-[var(--accent-orange)]' },
    { icon: Mail, label: 'Email', href: 'mailto:giorgos_M000@hotmail.com', color: 'bg-[var(--accent-green)]', hoverColor: 'hover:text-[var(--accent-pink)]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-12"
    >
      <header className="space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] tracking-tight uppercase">
          Let's <span className="doodle-circle">Connect</span>
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-70 font-medium max-w-2xl leading-relaxed">
          Have a project in mind or just want to chat? Drop me a <span className="doodle-underline">message</span> below 
          and I'll get back to you as soon as possible.
        </p>
      </header>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactInfo.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href || '#'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <div className={`p-3 rounded-xl ${item.color}`}>
              <item.icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider">{item.label}</p>
              <p className="font-bold text-[var(--text-color)]">{item.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all group`}
          >
            <div className={`p-2 rounded-lg ${item.color}`}>
              <item.icon size={20} className="text-white" />
            </div>
            <span className={`font-bold text-[var(--text-color)] uppercase tracking-wide transition-colors ${item.hoverColor}`}>
              {item.label}
            </span>
            <ExternalLink size={16} className="text-[var(--text-color)] opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.3 }}
        className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl p-8 md:p-12 brutal-shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-cyan)] rounded-bl-full -mr-12 -mt-12 border-b-4 border-l-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent-pink)] rounded-tr-full -ml-12 -mb-12 border-t-4 border-r-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--accent-yellow)] rounded-full opacity-10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-3 bg-[var(--accent-pink)] rounded-xl">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
              Send a Message
            </h2>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide flex items-center gap-2">
                  <span>Your Name</span>
                  <span className="text-[var(--accent-red)]">*</span>
                </label>
                <input 
                  type="text" 
                  id="name"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({...formState, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full px-5 py-4 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all ${
                    errors.name 
                      ? 'border-[var(--accent-red)] focus:ring-[var(--accent-red)]/30' 
                      : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]/30'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[var(--accent-red)] text-sm font-bold flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.name}
                  </motion.p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide flex items-center gap-2">
                  <span>Email Address</span>
                  <span className="text-[var(--accent-red)]">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({...formState, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  className={`w-full px-5 py-4 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all ${
                    errors.email 
                      ? 'border-[var(--accent-red)] focus:ring-[var(--accent-red)]/30' 
                      : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]/30'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[var(--accent-red)] text-sm font-bold flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.email}
                  </motion.p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide flex items-center gap-2">
                <span>Your Message</span>
                <span className="text-[var(--accent-red)]">*</span>
              </label>
              <textarea 
                id="message"
                rows={6}
                value={formState.message}
                onChange={(e) => {
                  setFormState({...formState, message: e.target.value});
                  if (errors.message) setErrors({...errors, message: ''});
                }}
                className={`w-full px-5 py-4 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all resize-none ${
                  errors.message 
                    ? 'border-[var(--accent-red)] focus:ring-[var(--accent-red)]/30' 
                    : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]/30'
                }`}
                placeholder="Tell me about your project or just say hi..."
              ></textarea>
              {errors.message && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-[var(--accent-red)] text-sm font-bold flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.message}
                </motion.p>
              )}
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl transition-all text-lg ${
                isSubmitted 
                  ? 'bg-[var(--accent-green)] text-white' 
                  : 'bg-[var(--text-color)] text-[var(--bg-color)] brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none'
              }`}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending...</span>
              ) : isSubmitted ? (
                <>
                  <span>Message Sent!</span>
                  <CheckCircle2 size={24} />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
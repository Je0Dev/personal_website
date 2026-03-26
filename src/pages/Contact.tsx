import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (formState.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
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
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    
    const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 500); // Shortened the timeout since mailto triggers instantly
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-3xl space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter uppercase">
          Let's <span className="doodle-circle">Connect</span>
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-80 font-medium max-w-2xl">
        <span className="doodle-underline">Drop me a message</span> below and I'll get back to you as soon as possible. Thanks a lot!
        </p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.3 }}
        className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl p-8 md:p-12 brutal-shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-cyan)] rounded-bl-full -mr-8 -mt-8 border-b-4 border-l-4 border-[var(--border-color)] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--accent-pink)] rounded-tr-full -ml-8 -mb-8 border-t-4 border-r-4 border-[var(--border-color)] opacity-50 pointer-events-none" />
        
        <div className="relative z-10">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({...formState, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]'
                  }`}
                  placeholder="Michael Jackson"
                />
                {errors.name && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-sm font-bold flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.name}
                  </motion.p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({...formState, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/50' 
                      : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]'
                  }`}
                  placeholder="thomasDestroyer@example.com"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-sm font-bold flex items-center gap-1 mt-1">
                    <AlertCircle size={14} /> {errors.email}
                  </motion.p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold font-mono text-[var(--text-color)] uppercase tracking-wide">Message Content</label>
              <textarea 
                id="message"
                rows={6}
                value={formState.message}
                onChange={(e) => {
                  setFormState({...formState, message: e.target.value});
                  if (errors.message) setErrors({...errors, message: ''});
                }}
                className={`w-full px-4 py-3 rounded-xl border-4 bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 transition-all resize-none ${
                  errors.message 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-[var(--border-color)] focus:ring-[var(--accent-cyan)]'
                }`}
                placeholder="Spill out secrets ..."
              ></textarea>
              {errors.message && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-500 text-sm font-bold flex items-center gap-1 mt-1">
                  <AlertCircle size={14} /> {errors.message}
                </motion.p>
              )}
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`flex items-center justify-center gap-3 w-full md:w-auto px-10 py-4 font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl transition-all text-lg ${
                isSubmitted 
                  ? 'bg-[var(--accent-green)] text-[var(--bg-color)]' 
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

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/Lanpenge47@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Ny besked fra ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <section className="py-16 lg:py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl lg:text-7xl font-black mb-6 lg:mb-8">{t('title')}</h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent opacity-10" />
        </section>

        <section className="py-12 lg:py-16 bg-green-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl shadow-green-100/40 border border-green-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4">{t('help.title')}</p>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('help.subtitle')}</h2>
                <p className="text-gray-500 leading-relaxed">{t('help.guide')}</p>
              </div>
              <a href="tel:+4589871006" className="inline-flex items-center justify-center rounded-3xl bg-green-600 text-white px-8 py-5 font-black text-base hover:bg-green-700 transition">
                {t('help.button')}
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              <div className="bg-gray-50 p-8 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-gray-100">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-sm text-green-600">
                  <Phone className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-[10px] lg:text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('info.phone')}</h3>
              </div>

              <div className="bg-gray-50 p-8 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-gray-100">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-sm text-green-600">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-[10px] lg:text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('info.hours')}</h3>
                <p className="text-xl lg:text-2xl font-black text-gray-900">{t('info.support')}</p>
              </div>

              <div className="bg-gray-50 p-8 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-gray-100">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-sm text-green-600">
                  <Mail className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-[10px] lg:text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Email</h3>
                {/* <p className="text-xl lg:text-2xl font-black text-gray-900">Lånpenge47@gmail.com</p> */}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 lg:p-20 rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl shadow-green-100/50 border border-green-50">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-black mb-4">Tak for din besked!</h3>
                  <p className="text-gray-500 text-lg">Vi vender tilbage til dig hurtigst muligt.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    <div className="space-y-3 lg:space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.name')}</label>
                      <input 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        className="w-full bg-gray-50 border-none rounded-xl lg:rounded-2xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none" 
                        placeholder={t('form.namePlaceholder')} 
                      />
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.email')}</label>
                      <input 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        className="w-full bg-gray-50 border-none rounded-xl lg:rounded-2xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none" 
                        placeholder={t('form.emailPlaceholder')} 
                      />
                    </div>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.message')}</label>
                    <textarea 
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5} 
                      className="w-full bg-gray-50 border-none rounded-2xl lg:rounded-3xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none" 
                      placeholder={t('form.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <button 
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-5 lg:py-6 rounded-2xl lg:rounded-3xl font-black text-lg lg:text-xl hover:bg-green-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-green-200 flex items-center justify-center gap-4 disabled:bg-gray-400"
                  >
                    {isLoading ? 'Sender...' : (
                      <>
                        {t('form.send')}
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

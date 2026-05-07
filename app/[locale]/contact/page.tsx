import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {Phone, Mail, Clock, Send} from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  
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

        <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              <div className="bg-gray-50 p-8 lg:p-10 rounded-3xl lg:rounded-[2.5rem] border border-gray-100">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-sm text-green-600">
                  <Phone className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-[10px] lg:text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{t('info.phone')}</h3>
                <p className="text-xl lg:text-2xl font-black text-gray-900">+45 89 87 10 06</p>
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
                <p className="text-xl lg:text-2xl font-black text-gray-900">Lånpenge47@gmail.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 lg:p-20 rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl shadow-green-100/50 border border-green-50">
              <form className="space-y-8 lg:space-y-10">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                  <div className="space-y-3 lg:space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.name')}</label>
                    <input type="text" className="w-full bg-gray-50 border-none rounded-xl lg:rounded-2xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none" placeholder="Dit navn" />
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.email')}</label>
                    <input type="email" className="w-full bg-gray-50 border-none rounded-xl lg:rounded-2xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none" placeholder="din@email.dk" />
                  </div>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">{t('form.message')}</label>
                  <textarea rows={5} className="w-full bg-gray-50 border-none rounded-2xl lg:rounded-3xl p-5 lg:p-6 focus:ring-4 focus:ring-green-100 transition-all outline-none resize-none" placeholder="Hvordan kan vi hjælpe?"></textarea>
                </div>
                <button className="w-full bg-green-500 text-white py-5 lg:py-6 rounded-2xl lg:rounded-3xl font-black text-lg lg:text-xl hover:bg-green-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-green-200 flex items-center justify-center gap-4">
                  {t('form.send')}
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

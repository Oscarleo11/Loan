import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {Target, Users, Sparkles} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-green-50/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        </section>

        {/* History */}
        <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative mb-12 lg:mb-0">
              <div className="aspect-square bg-gray-200 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                  alt="LoanDansk Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-10 bg-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-xl border border-gray-50">
                <p className="text-2xl lg:text-4xl font-black text-green-600 mb-2">50.000+</p>
                <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] lg:text-xs">{t('companiesHelped')}</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-8 lg:mb-10 text-gray-900 text-center lg:text-left">{t('historyTitle')}</h2>
              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-10 lg:mb-12 text-center lg:text-left">
                {t('history')}
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">{t('values.transparency')}</h3>
                    <p className="text-gray-500 leading-relaxed">{t('values.transparencyDesc')}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">{t('values.speed')}</h3>
                    <p className="text-gray-500 leading-relaxed">{t('values.speedDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-100">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4">{t('missionTitle')}</p>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{t('missionTitle')}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">{t('missionText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

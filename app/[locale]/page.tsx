'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {useRouter} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import StatsSection from '@/components/StatsSection';
import {Zap, Shield, Unlock, ArrowRight} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const [loanAmount, setLoanAmount] = useState(50000);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApply = () => {
    router.push(`/apply?amount=${loanAmount}`);
  };

  const estimatedMonthly = Math.round(loanAmount * 0.015);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {t('hero.subtitle')}
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-[1.05]">
                {t('title')}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                {t('description')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                  ].map((src, i) => (
                    <img key={i} src={src} alt="Kunde" className="w-12 h-12 rounded-full border-4 border-white object-cover" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-yellow-400 mb-1 font-bold">★★★★★</div>
                  <div className="font-bold text-gray-900 uppercase tracking-tighter text-xs">{t('hero.happyCustomers')}</div>
                </div>
              </div>
            </div>

            {/* Loan Calculator Card */}
            <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-2xl shadow-green-100/50 border border-green-50 relative">
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-2 rounded-2xl font-bold text-sm shadow-lg rotate-3">
                {t('hero.payout')}
              </div>
              
              <h2 className="text-2xl font-black mb-8">{t('calculator.title')}</h2>
              
              <div className="mb-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">{t('calculator.amount')}</span>
                  <span className="text-4xl font-black text-gray-900 tracking-tight">{formatCurrency(loanAmount)}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="3000000" 
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-100 rounded-full appearance-none cursor-pointer accent-green-500 mb-4"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  <span>10.000 kr.</span>
                  <span>3.000.000 kr.</span>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl mb-8 border border-gray-100">
                <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">{t('calculator.monthly')}</p>
                <p className="text-4xl font-black text-green-600">{formatCurrency(estimatedMonthly)}</p>
              </div>

              <button 
                onClick={handleApply}
                className="w-full bg-green-500 text-white py-6 rounded-3xl font-black text-xl hover:bg-green-600 transition-all transform hover:-translate-y-1 active:scale-[0.98] shadow-xl shadow-green-200 flex items-center justify-center gap-3"
              >
                {t('applyButton')}
                <ArrowRight className="w-6 h-6" />
              </button>
              
              <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed font-medium">
                {t('calculator.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-white py-12 border-y">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-10 grayscale opacity-40">
          <div className="font-black text-xl md:text-2xl tracking-tighter italic">FINANSTILSYNET</div>
          <div className="font-black text-xl md:text-2xl tracking-tighter">TRUSTPILOT</div>
          <div className="font-black text-xl md:text-2xl tracking-tighter">DI</div>
          <div className="font-black text-xl md:text-2xl tracking-tighter">DANSK ERHVERV</div>
        </div>
      </div>

      <StatsSection />

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">{t('benefits.title')}</h2>
            <div className="w-24 h-2 bg-green-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('benefits.item1')}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {t('benefits.desc1')}
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('benefits.item2')}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {t('benefits.desc2')}
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                <Unlock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-6">{t('benefits.item3')}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">
                {t('benefits.desc3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-16 lg:mb-24 text-center">{t('process.title')}</h2>
          <div className="grid md:grid-cols-3 gap-16 lg:gap-20 relative">
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-green-100 -z-0" />
            
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white border-4 lg:border-8 border-green-500 rounded-full flex items-center justify-center mb-8 lg:mb-10 shadow-2xl shadow-green-100">
                  <span className="text-3xl lg:text-4xl font-black text-green-600">{i}</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 lg:mb-6">{t(`process.step${i}` as any)}</h3>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-xs">
                  {t('process.desc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4">{t('faq.label')}</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{t('faq.title')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('faq.subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 mb-4">{t(`faq.item${index}.question` as any)}</h3>
                <p className="text-gray-500 leading-relaxed">{t(`faq.item${index}.answer` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <Footer />
    </div>
  );
}

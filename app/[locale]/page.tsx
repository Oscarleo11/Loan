'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {useRouter} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import StatsSection from '@/components/StatsSection';
import {Zap, Shield, Unlock, ArrowRight} from 'lucide-react';
import {motion, Variants} from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

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
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {t('hero.subtitle')}
              </motion.div>
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-[1.05]"
              >
                {t('title')}
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed"
              >
                Få lån op til 3.000.000 kr. med svar med det samme. Vi tilbyder gennemsigtige vilkår og hurtig udbetaling til både private og virksomheder.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10"
              >
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                  ].map((src, i) => (
                    <motion.img 
                      key={i} 
                      src={src} 
                      alt="Kunde" 
                      className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-yellow-400 mb-1 font-bold">★★★★★</div>
                  <div className="font-bold text-gray-900 uppercase tracking-tighter text-xs">{t('hero.happyCustomers')}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Loan Calculator Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-2xl shadow-green-100/50 border border-green-50 relative"
            >
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-2 rounded-2xl font-bold text-sm shadow-lg"
              >
                {t('hero.payout')}
              </motion.div>
              
              <h2 className="text-2xl font-black mb-8">{t('calculator.title')}</h2>
              
              <div className="mb-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">{t('calculator.amount')}</span>
                  <motion.span 
                    key={loanAmount}
                    initial={{ scale: 1.2, color: '#22C55E' }}
                    animate={{ scale: 1, color: '#111827' }}
                    className="text-4xl font-black tracking-tight"
                  >
                    {formatCurrency(loanAmount)}
                  </motion.span>
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

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gray-50 p-8 rounded-3xl mb-8 border border-gray-100"
              >
                <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">{t('calculator.monthly')}</p>
                <p className="text-4xl font-black text-green-600">{formatCurrency(estimatedMonthly)}</p>
              </motion.div>

              <motion.button 
                onClick={handleApply}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-green-500 text-white py-6 rounded-3xl font-black text-xl hover:bg-green-600 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-3"
              >
                {t('applyButton')}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
              
              <p className="text-[10px] text-gray-400 text-center mt-6 leading-relaxed font-medium">
                {t('calculator.disclaimer')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <motion.div 
        className="bg-white py-12 border-y"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-10 grayscale opacity-40">
          {['FINANSTILSYNET', 'TRUSTPILOT', 'DI', 'DANSK ERHVERV'].map((badge, i) => (
            <motion.div 
              key={badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="font-black text-xl md:text-2xl tracking-tighter italic"
            >
              {badge}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <StatsSection />

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8">{t('benefits.title')}</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-2 bg-green-500 mx-auto rounded-full"
            />
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Zap, title: t('benefits.item1'), desc: t('benefits.desc1') },
              { icon: Shield, title: t('benefits.item2'), desc: t('benefits.desc2') },
              { icon: Unlock, title: t('benefits.item3'), desc: t('benefits.desc3') }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-sm hover:shadow-2xl border border-gray-100 group"
              >
                <motion.div 
                  className="w-20 h-20 bg-green-50 text-green-600 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <item.icon className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-gray-900 mb-16 lg:mb-24 text-center"
          >
            {t('process.title')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-16 lg:gap-20 relative">
            <motion.div 
              className="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-green-100 -z-0"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />
            
            {[1, 2, 3].map((i, idx) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <motion.div 
                  className="w-24 h-24 lg:w-32 lg:h-32 bg-white border-4 lg:border-8 border-green-500 rounded-full flex items-center justify-center mb-8 lg:mb-10 shadow-2xl shadow-green-100"
                  whileHover={{ scale: 1.1, borderColor: '#16a34a' }}
                >
                  <span className="text-3xl lg:text-4xl font-black text-green-600">{i}</span>
                </motion.div>
                <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-4 lg:mb-6">{t(`process.step${i}` as any)}</h3>
                <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-xs">
                  {t('process.desc')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4">{t('faq.label')}</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{t('faq.title')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('faq.subtitle')}</p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-100"
              >
                <h3 className="text-xl font-black text-gray-900 mb-4">{t(`faq.item${index}.question` as any)}</h3>
                <p className="text-gray-500 leading-relaxed">{t(`faq.item${index}.answer` as any)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TestimonialCarousel />

      <Footer />
    </div>
  );
}

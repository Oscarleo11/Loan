'use client';

import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {CheckCircle2, TrendingUp, Wallet, ArrowRight} from 'lucide-react';
import {motion} from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function LoansPage() {
  const t = useTranslations('LoansPage');
  
  const privateProducts = [
    {
      id: 'privateLoan', 
      icon: <Wallet className="w-12 h-12" />, 
      color: 'bg-green-600',
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const businessProducts = [
    {
      id: 'businessLoan', 
      icon: <TrendingUp className="w-12 h-12" />, 
      color: 'bg-blue-600',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 'credit', 
      icon: <Wallet className="w-12 h-12" />, 
      color: 'bg-indigo-600',
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 'factoring', 
      icon: <CheckCircle2 className="w-12 h-12" />, 
      color: 'bg-purple-600',
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-gray-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-7xl font-black mb-6 lg:mb-8"
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 lg:mb-12"
            >
              {t('description')}
            </motion.p>
          </div>
        </section>

        {/* Private Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">{t('privateSection.title')}</h2>
            <p className="text-xl text-gray-500">{t('privateSection.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {privateProducts.map((prod) => (
              <motion.div 
                key={prod.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={prod.image} 
                    alt={prod.id} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className={`absolute inset-0 ${prod.color} opacity-20`} />
                </div>
                <div className="p-10">
                  <motion.div 
                    className={`w-16 h-16 ${prod.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {prod.icon}
                  </motion.div>
                  <h2 className="text-2xl font-black mb-6">
                    {t(`products.${prod.id}.title` as any)}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-10">
                    {t(`products.${prod.id}.desc` as any)}
                  </p>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 font-black text-green-600 uppercase tracking-widest text-xs"
                  >
                    {t(`products.${prod.id}.readMore` as any)} <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Business Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">{t('businessSection.title')}</h2>
            <p className="text-xl text-gray-500">{t('businessSection.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {businessProducts.map((prod) => (
              <motion.div 
                key={prod.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                  <motion.img 
                    src={prod.image} 
                    alt={prod.id} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className={`absolute inset-0 ${prod.color} opacity-20`} />
                </div>
                <div className="p-10">
                  <motion.div 
                    className={`w-16 h-16 ${prod.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-gray-200`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {prod.icon}
                  </motion.div>
                  <h2 className="text-2xl font-black mb-6">
                    {t(`products.${prod.id}.title` as any)}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-10">
                    {t(`products.${prod.id}.desc` as any)}
                  </p>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 font-black text-green-600 uppercase tracking-widest text-xs"
                  >
                    {t(`products.${prod.id}.readMore` as any)} <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

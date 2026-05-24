'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsPage() {
  const t = useTranslations('Legal.terms');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-20 lg:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-gray-500 font-medium mb-12">{t('lastUpdated')}</p>
          
          <div className="prose prose-lg max-w-none text-gray-600 space-y-12">
            <p className="text-xl leading-relaxed">{t('intro')}</p>
            
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-4">{t('section1.title')}</h2>
              <p>{t('section1.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-4">{t('section2.title')}</h2>
              <p>{t('section2.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-black text-gray-900 mb-4">{t('section3.title')}</h2>
              <p>{t('section3.content')}</p>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

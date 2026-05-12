'use client';

import {useTranslations} from 'next-intl';
import Link from '@/i18n/routing';
import {useRouter} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {Target, Sparkles, Handshake, Users, Award, Clock} from 'lucide-react';
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

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const router = useRouter();
  
  const teamMembers = [
    { name: t('team.member1.name'), role: t('team.member1.role'), bio: t('team.member1.bio'), image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
    { name: t('team.member2.name'), role: t('team.member2.role'), bio: t('team.member2.bio'), image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: t('team.member3.name'), role: t('team.member3.role'), bio: t('team.member3.bio'), image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" }
  ];

  const stats = [
    { icon: Clock, value: '10+', label: t('stats.years') },
    { icon: Users, value: '50.000+', label: t('stats.customers') },
    { icon: Award, value: '94%', label: t('stats.approval') },
    { icon: Sparkles, value: '24/7', label: t('stats.support') }
  ];

  const partners = [t('partners.partner1'), t('partners.partner2'), t('partners.partner3'), t('partners.partner4')];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-green-50/50 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-tight"
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-black mb-2">{stat.value}</p>
                  <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* History */}
        <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              className="relative mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-square bg-gray-200 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl">
                <motion.img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                  alt="Mylånbank Team" 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <motion.div 
                className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-10 bg-white p-6 lg:p-10 rounded-2xl lg:rounded-3xl shadow-xl border border-gray-50"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <p className="text-2xl lg:text-4xl font-black text-green-600 mb-2">50.000+</p>
                <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px] lg:text-xs">{t('companiesHelped')}</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-black mb-8 lg:mb-10 text-gray-900 text-center lg:text-left"
              >
                {t('historyTitle')}
              </motion.h2>
              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed mb-10 lg:mb-12 text-center lg:text-left">
                {t('history')}
              </p>
              <div className="space-y-8">
                {[
                  { icon: Target, title: t('values.transparency'), desc: t('values.transparencyDesc') },
                  { icon: Sparkles, title: t('values.speed'), desc: t('values.speedDesc') }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-6 items-start"
                  >
                    <motion.div 
                      className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-black mb-2">{item.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-gray-200/40 border border-gray-100"
            >
              <div className="max-w-3xl mx-auto text-center">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4"
                >
                  {t('missionTitle')}
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl font-black text-gray-900 mb-6"
                >
                  {t('missionTitle')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-500 text-lg leading-relaxed"
                >
                  {t('missionText')}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{t('team.title')}</h2>
              <p className="text-lg text-gray-500">{t('team.subtitle')}</p>
            </motion.div>
            <motion.div 
              className="grid md:grid-cols-3 gap-8 lg:gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/30 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-black text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-gray-500 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Handshake className="w-8 h-8" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">{t('partners.title')}</h2>
              <p className="text-lg text-gray-500">{t('partners.subtitle')}</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 flex items-center justify-center"
                >
                  <p className="text-xl font-black text-gray-700 tracking-tight">{partner}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-black mb-6">{t('cta.title')}</h2>
              <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/apply')}
                className="bg-white text-green-600 px-12 py-5 rounded-2xl font-black text-xl shadow-xl"
              >
                {t('cta.button')}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

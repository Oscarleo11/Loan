'use client';

import { useTranslations } from 'next-intl';
import { Users, Landmark, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const t = useTranslations('HomePage.stats');

  const stats = [
    {
      id: 'customers',
      value: '50.000+',
      icon: <Users className="w-8 h-8" />,
      label: t('customers'),
    },
    {
      id: 'payout',
      value: '2.5 Mrd.',
      icon: <Landmark className="w-8 h-8" />,
      label: t('payout'),
    },
    {
      id: 'rating',
      value: '4.8/5',
      icon: <Star className="w-8 h-8" />,
      label: t('rating'),
    },
    {
      id: 'speed',
      value: '60 min',
      icon: <Clock className="w-8 h-8" />,
      label: t('speed'),
    },
  ];

  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl lg:text-5xl font-black mb-2">{stat.value}</p>
              <p className="text-green-100 font-bold uppercase tracking-wider text-xs lg:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

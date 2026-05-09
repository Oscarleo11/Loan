'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('Navigation');
  
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <Logo className="w-8 h-8" />
              <div className="text-xl font-bold tracking-tight">Mylånbank</div>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8">
              {t('footerDesc')}
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-wider text-gray-500">{t('products')}</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/loans" className="hover:text-green-400 transition">{t('businessLoan')}</Link></li>
              <li className="hover:text-green-400 transition cursor-pointer">{t('credit')}</li>
              <li className="hover:text-green-400 transition cursor-pointer">{t('factoring')}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-wider text-gray-500">{t('company')}</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/about" className="hover:text-green-400 transition">{t('about')}</Link></li>
              <li className="hover:text-green-400 transition cursor-pointer">{t('careers')}</li>
              <li><Link href="/contact" className="hover:text-green-400 transition">{t('contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-lg mb-8 uppercase tracking-wider text-gray-500">{t('support')}</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="hover:text-green-400 transition cursor-pointer">{t('faq')}</li>
              <li className="hover:text-green-400 transition cursor-pointer">{t('terms')}</li>
              <li className="hover:text-green-400 transition cursor-pointer">{t('privacy')}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-10 text-center text-gray-500 text-sm">
          <p className="mb-4">{t('registered')}</p>
          <p>© 2026 Mylånbank. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

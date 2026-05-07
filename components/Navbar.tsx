'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import {Menu, X} from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="border-b sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="text-2xl font-bold text-gray-900 tracking-tight">Mylånbank</div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-semibold text-sm uppercase tracking-wide">
          <Link href="/loans" className="text-gray-600 hover:text-green-600 transition">{t('loans')}</Link>
          <Link href="/about" className="text-gray-600 hover:text-green-600 transition">{t('about')}</Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-600 transition">{t('contact')}</Link>
          <LanguageSwitcher />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-green-600 transition"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link 
            href="/loans" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-gray-900 hover:text-green-600"
          >
            {t('loans')}
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-gray-900 hover:text-green-600"
          >
            {t('about')}
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setIsOpen(false)}
            className="block text-lg font-bold text-gray-900 hover:text-green-600"
          >
            {t('contact')}
          </Link>
        </div>
      )}
    </header>
  );
}

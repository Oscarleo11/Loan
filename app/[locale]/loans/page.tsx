import {useTranslations} from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {CheckCircle2, TrendingUp, Wallet, ArrowRight} from 'lucide-react';

export default function LoansPage() {
  const t = useTranslations('LoansPage');
  
  const products = [
    {
      id: 'businessLoan', 
      icon: <TrendingUp className="w-12 h-12" />, 
      color: 'bg-blue-500',
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 'credit', 
      icon: <Wallet className="w-12 h-12" />, 
      color: 'bg-green-500',
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500"
    },
    {
      id: 'factoring', 
      icon: <CheckCircle2 className="w-12 h-12" />, 
      color: 'bg-purple-500',
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-gray-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl lg:text-7xl font-black mb-6 lg:mb-8">{t('title')}</h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 lg:mb-12">
              {t('description')}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />
        </section>

        <section className="py-20 lg:py-28 bg-green-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm uppercase tracking-[0.4em] text-green-600 font-black mb-4">{t('guide.title')}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900">{t('guide.title')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100">
                  <div className="text-green-600 text-4xl font-black mb-6">0{index}</div>
                  <p className="text-gray-500 leading-relaxed text-lg">{t(`guide.item${index}` as any)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {products.map((prod) => (
              <div key={prod.id} className="group bg-white rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img src={prod.image} alt={prod.id} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 ${prod.color} opacity-20`} />
                </div>
                <div className="p-10">
                  <div className={`w-16 h-16 ${prod.color} text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform shadow-lg shadow-gray-200`}>
                    {prod.icon}
                  </div>
                  <h2 className="text-2xl font-black mb-6">
                    {t(`products.${prod.id}.title` as any)}
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-10">
                    {t(`products.${prod.id}.desc` as any)}
                  </p>
                  <button className="flex items-center gap-2 font-black text-green-600 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                    Læs mere <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <TestimonialCarousel />
      <Footer />
    </div>
  );
}

'use client';

import React, {useCallback, useEffect} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {ChevronLeft, ChevronRight, Quote} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function TestimonialCarousel() {
  const t = useTranslations('HomePage');
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, align: 'start'});

  useEffect(() => {
    if (!emblaApi) return;
    const interval = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => window.clearInterval(interval);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    {
      quote: t('testimonials.quote1'), 
      author: t('testimonials.author1'), 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: t('testimonials.quote2'), 
      author: t('testimonials.author2'), 
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: t('testimonials.quote3'), 
      author: t('testimonials.author3'), 
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: t('testimonials.quote4'), 
      author: t('testimonials.author4'), 
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
    },
    {
      quote: t('testimonials.quote5'), 
      author: t('testimonials.author5'), 
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150"
    },
  ];

  return (
    <section className="py-24 bg-green-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-black max-w-xl leading-tight">
            {t('testimonials.title')}
          </h2>
          <div className="flex gap-4">
            <button 
              onClick={scrollPrev}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {testimonials.map((test, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] md:flex-[0_0_45%] min-w-0">
                <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-12 h-12 text-green-500 mb-6 opacity-50" />
                    <p className="text-2xl font-medium mb-8 leading-relaxed italic">
                      "{test.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={test.image} alt={test.author} className="w-14 h-14 rounded-full object-cover border-2 border-green-500" />
                    <div>
                      <p className="font-black text-lg">{test.author}</p>
                      <p className="text-green-400 font-medium text-sm text-uppercase uppercase tracking-widest">{t('testimonials.verified')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

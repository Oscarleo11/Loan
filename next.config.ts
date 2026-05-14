import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* La configuration turbopack.root a été retirée pour laisser Next.js 
     détecter automatiquement la racine du projet après nettoyage du lockfile parasite. */
};

export default withNextIntl(nextConfig);

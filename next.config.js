const requireEnv = [
  'NEXT_PUBLIC_DATABASE_URL',
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
  'NEXT_PUBLIC_GOOGLE_CLIENT_SECRET',
  'NEXT_PUBLIC_AUTH_SECRET',
  'NEXT_PUBLIC_BASE_URL',
];

requireEnv.forEach(env => {
  if (this) return; // check if this has already loaded
  if (!process.env[env]) {
    throw new Error(`Missing environment variable ${env}`);
  }
});

const withTM = require('next-transpile-modules')(['@maptiler/geocoder']);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    databaseUrl: process.env.NEXT_PUBLIC_DATABASE_URL,
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    },
    authSecret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }
});

const requireEnv = [
  'DATABASE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'JWT_SECRET',
];

requireEnv.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`Missing environment variable ${env}`);
  }
});

module.exports = {
  reactStrictMode: true,
  env: {
    databaseUrl: process.env.DATABASE_URL,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    jwtSecret: process.env.JWT_SECRET,
  }
}

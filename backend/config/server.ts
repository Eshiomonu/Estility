export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  return {
    url: isProduction 
      ? env('RENDER_EXTERNAL_URL', 'https://estility.onrender.com') 
      : 'http://localhost:1337',
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};

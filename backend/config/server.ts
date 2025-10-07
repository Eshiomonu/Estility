export default ({ env }) => ({
  url: env('RENDER_EXTERNAL_URL', 'https://estility.onrender.com'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

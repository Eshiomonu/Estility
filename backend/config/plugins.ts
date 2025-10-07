module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('ADMIN_JWT_SECRET', 'nuLDfb3/rer/74+Rx7Eyew=='),
    },
  },
});

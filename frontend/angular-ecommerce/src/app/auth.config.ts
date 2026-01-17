import { AuthConfig } from '@auth0/auth0-angular';

export const authConfig: AuthConfig = {
  domain: 'dev-6gfhvlt4kzfqt7fi.us.auth0.com',
  clientId: 'OXQQLvHBfUb6vOar2hbC6ZeqpzrtXNnz',

  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'http://localhost:8080',
  },

  httpInterceptor: {
    allowedList: [
      'http://localhost:8080/api/orders/**',
      'http://localhost:8080/api/checkout/purchase',
    ],
  },
};

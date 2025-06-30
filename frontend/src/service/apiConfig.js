//CHANGE THIS FILE TO CONFIGURE THE API URL

function isLocalEnv() {
  // Checks if running on localhost or 127.0.0.1
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
  // Fallback for Node.js (SSR or build tools)
  return process.env.NODE_ENV !== 'production';
}

export const API_URL = isLocalEnv()
  ? 'http://localhost:3000/api'
  : 'http://pharmachain-hva.xyz:3000/api';

export const API_URL_LOGIN = isLocalEnv()
  ? 'http://localhost:3000/login'
  : 'http://pharmachain-hva.xyz:3000/login';

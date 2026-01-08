// Backend configuration for REST API
// Set `BASE_URL` to your server's base URL (no trailing slash), e.g. 'https://api.example.com'
// Defaults geared for local device/emulator testing:
// - Android emulator (Android Studio): use 10.0.2.2
// - iOS simulator: use localhost
// - Expo on device: use your machine IP (e.g. http://192.168.1.10:3000)
export const BASE_URL = 'http://127.0.0.1:3000';

// Endpoints used by the app
export const ENDPOINTS = {
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin'
};

// Notes:
// - Your backend should accept JSON body { name, username, email, password } for SIGN_UP
//   and return a JSON object with at least { token } or { user } on success.
// - For SIGN_IN, allow either { email, password } or { username, password } depending
//   on your API. The auth client below will send { identifier, password } to the SIGN_IN endpoint.

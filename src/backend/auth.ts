import { BASE_URL, ENDPOINTS } from './config';
import { setToken, getToken } from './token';

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

async function request(path: string, body: any) {
  const token = await getToken();
  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { message: text }; }

  if (!res.ok) {
    const message = data && data.message ? data.message : res.statusText;
    throw new Error(message || 'Request failed');
  }

  return data;
}

export async function signUp(payload: SignUpData) {
  const { name, email, password } = payload;
  const data = await request(ENDPOINTS.SIGN_UP, { name, email, password });
  if (data && data.token) await setToken(data.token);
  return data;
}

export async function signIn(identifier: string, password: string) {
  // Send generic identifier field; backend decides if it's email or username
  const data = await request(ENDPOINTS.SIGN_IN, { identifier, password });
  if (data && data.token) await setToken(data.token);
  return data;
}

export async function signOut() {
  // If your backend supports server-side signout/revocation, call it here.
  return Promise.resolve();
}

export default { signUp, signIn, signOut };

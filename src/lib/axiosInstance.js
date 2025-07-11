// Axios instance setup
import axios from 'axios';

// 🌍 Base Root from .env OR fallback (should always use env in prod)
const BASE_ROOT = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bluapi.aas.technology';

// 1️⃣ Main Authenticated API (/api with credentials)
export const axiosInstance = axios.create({
  baseURL: `${BASE_ROOT}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 2️⃣ API without credentials (for SSR/fetch or less-sensitive routes)
export const axiosInstance2 = axios.create({
  baseURL: `${BASE_ROOT}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// 3️⃣ Meeting API (no /api prefix — direct root level)
export const axiosMeetingAPI = axios.create({
  baseURL: `${BASE_ROOT}/meeting`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 4️⃣ Public API (like payment, plans, homepage data)
export const axiosInstancePublic = axios.create({
  baseURL: `${BASE_ROOT}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// 5️⃣ File Uploads (with multipart/form-data)
export const axiosFileUpload = axios.create({
  baseURL: `${BASE_ROOT}/upload`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

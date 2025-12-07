const defaultApiBase =
  typeof window !== "undefined"
    ? window.location.origin.replace("3000", "3080")
    : "http://localhost:3080";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || defaultApiBase;

export default {
  BASE_URL,
};

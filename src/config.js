const guessApiUrl =
  typeof window === "undefined"
    ? "http://localhost:3080"
    : window.location.origin.replace("3000", "3080");
const BASE_URL = import.meta.env.VITE_API_BASE_URL || guessApiUrl;
const config = { BASE_URL };
export default config;

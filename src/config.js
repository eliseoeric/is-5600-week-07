const host = typeof window !== "undefined" ? window.location.hostname : "";
export const BASE_URL = host.includes("-3000.")
  ? `https://${host.replace("-3000.", "-3080.")}`
  : "";

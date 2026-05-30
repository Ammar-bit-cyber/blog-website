/** Same origin when app is served from Express (port 3000). Vite proxy uses '' in dev too. */
export const API_BASE = import.meta.env.VITE_API_BASE ?? '';

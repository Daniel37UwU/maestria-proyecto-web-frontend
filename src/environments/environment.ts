export const environment = {
  production: true,
  // Leemos la variable global de proceso que Vercel inyectará al compilar
  apiUrl: (window as any).env?.NG_APP_API_URL || 'https://maestria-proyecto-web-backend-production.up.railway.app'
};
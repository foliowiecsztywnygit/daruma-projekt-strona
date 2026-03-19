import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react()];
  
  if (process.env.NODE_ENV !== 'test') {
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    plugins.push(tailwindcss());
  }

  return {
    plugins,
  };
})

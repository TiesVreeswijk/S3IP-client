import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the React plugin

export default defineConfig({
  base: './', // Ensures assets are loaded relatively
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Ensure consistent paths
      },
    },
  },// Enable React plugin
});

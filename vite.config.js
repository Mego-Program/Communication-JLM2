import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";




export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'AppCommunication',
      filename: 'remoteEntry.js',
      exposes: {
        './AppCommunication': './src/App', // Adjust this path to your App component
      },
      shared: ['react', 'react-dom' /* other shared dependencies */],
    }),
  ],
  // ... other configurations
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

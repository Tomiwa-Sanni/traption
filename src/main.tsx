
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error handling for app initialization
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Remove console logs in production
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }
} catch (error) {
  console.error("Failed to initialize application:", error);
  
  // Display a fallback error message in the DOM
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please try refreshing the page.</p>
        <p style="color: gray; font-size: 12px;">Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
}

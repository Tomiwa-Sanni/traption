
import { useState, useEffect } from 'react';

export function useApiKey() {
  // In our new architecture, we're using server-side API keys
  // This hook is kept for backward compatibility but simplified
  const [hasApiKey, setHasApiKey] = useState(true);

  return {
    apiKey: 'server-side-key', // Dummy value - actual key is on the server
    hasApiKey: true,           // Always return true since we're using server-side keys
    saveApiKey: () => {},      // No-op function
    clearApiKey: () => {},     // No-op function
  };
}

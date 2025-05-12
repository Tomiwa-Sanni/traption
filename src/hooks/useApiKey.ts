
import { useState, useEffect } from 'react';

// Fixed API key for all users
const FIXED_API_KEY = "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";

export function useApiKey() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Set loading to false after component mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Always return the fixed API key
  return {
    apiKey: FIXED_API_KEY,
    isLoading,
    hasApiKey: true,
  };
}

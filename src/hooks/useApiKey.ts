
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

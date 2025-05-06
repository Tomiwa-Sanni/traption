
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    setIsLoading(false);
  }, []);

  const saveApiKey = (key: string) => {
    if (!key.trim()) {
      toast.error('Please enter a valid API key');
      return false;
    }
    
    try {
      localStorage.setItem('openai_api_key', key.trim());
      setApiKey(key.trim());
      toast.success('API key saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
      return false;
    }
  };

  const clearApiKey = () => {
    try {
      localStorage.removeItem('openai_api_key');
      setApiKey('');
      toast.success('API key removed');
      return true;
    } catch (error) {
      console.error('Error removing API key:', error);
      toast.error('Failed to remove API key');
      return false;
    }
  };

  return {
    apiKey,
    isLoading,
    saveApiKey,
    clearApiKey,
    hasApiKey: !!apiKey,
  };
}

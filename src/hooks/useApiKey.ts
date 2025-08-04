
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-api-key');
        
        if (error) {
          console.error('Error fetching API key:', error);
          setIsLoading(false);
          return;
        }

        if (data?.apiKey) {
          setApiKey(data.apiKey);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  return {
    apiKey,
    isLoading,
    hasApiKey: !!apiKey,
  };
}

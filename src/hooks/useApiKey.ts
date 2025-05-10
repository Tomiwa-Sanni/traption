
import { useState, useEffect } from 'react';

export const useApiKey = () => {
  // Since we're using Netlify Functions with server-side API key,
  // we just need to return that the API key is available
  return {
    apiKey: null,
    hasApiKey: true,
    setApiKey: () => {},
    removeApiKey: () => {}
  };
};

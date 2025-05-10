
import { useState, useEffect } from 'react';

export const useApiKey = () => {
  // Since we're using PuterJS, no API key is needed
  return {
    apiKey: null,
    hasApiKey: true,
    setApiKey: () => {},
    removeApiKey: () => {}
  };
};

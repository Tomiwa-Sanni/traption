
import { useState } from 'react';

export function useApiKey() {
  // This hook now simply indicates the API is ready to use
  // No actual API key handling in the frontend
  return {
    hasApiKey: true, // Always true since we're using server-side keys
    isReady: true,   // Indicate the system is ready to use
  };
}

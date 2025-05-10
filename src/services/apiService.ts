
import { toast } from 'sonner';

export interface CaptionParams {
  platform: string | string[];
  tone: string;
  style: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
  language: string;
  description: string;
  audience: string;
  keywords: string[];
  cta: string;
  captionLength: string;
}

// Event emitter for updating captions progressively
export const captionProgressEmitter = new EventTarget();

/**
 * Securely generates captions using Netlify Functions
 * This is the recommended way to generate captions as it keeps the API key secure on the server side
 */
export async function generateCaption(params: CaptionParams): Promise<string | Record<string, string>> {
  const platforms = Array.isArray(params.platform) ? params.platform : [params.platform];
  const results: Record<string, string> = {};
  
  // Initialize progress for each platform
  platforms.forEach(platform => {
    const initialEvent = new CustomEvent('captionProgress', {
      detail: { platform, status: 'started' }
    });
    captionProgressEmitter.dispatchEvent(initialEvent);
  });

  try {
    // Determine if we should call the single or multi caption function
    const endpoint = platforms.length > 1 
      ? '/.netlify/functions/generate-multi-caption'
      : '/.netlify/functions/generate-caption';

    // Emit status updates showing the generation is in progress
    platforms.forEach(platform => {
      const progressEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'draft-completed' }
      });
      setTimeout(() => {
        captionProgressEmitter.dispatchEvent(progressEvent);
      }, 1500);
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        platforms,
        ...params
      })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to generate caption';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If response can't be parsed as JSON, use status text
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // For single platform, wrap the result in an object with the platform key
    if (platforms.length === 1) {
      results[platforms[0]] = data.caption;
      
      // Emit completion event for the single platform
      const finalEvent = new CustomEvent('captionProgress', {
        detail: { platform: platforms[0], status: 'completed', caption: data.caption }
      });
      captionProgressEmitter.dispatchEvent(finalEvent);
    } else {
      // For multi-platform, the response is already an object with platform keys
      Object.entries(data).forEach(([platform, caption]) => {
        results[platform] = caption as string;
        
        // Emit completion event for each platform
        const finalEvent = new CustomEvent('captionProgress', {
          detail: { platform, status: 'completed', caption }
        });
        captionProgressEmitter.dispatchEvent(finalEvent);
      });
    }

    return platforms.length === 1 ? results[platforms[0]] : results;
  } catch (error: any) {
    platforms.forEach(platform => {
      const errorEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'error', error: error.message }
      });
      captionProgressEmitter.dispatchEvent(errorEvent);
      
      results[platform] = `Error: ${error.message}`;
    });
    
    toast.error(error.message || 'Failed to generate caption');
    throw error;
  }
}

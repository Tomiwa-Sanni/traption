
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
 * Generates captions using PuterJS (client-side)
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
    // Generate captions for each platform in parallel
    const captionPromises = platforms.map(async (platform) => {
      // Emit a progress update - draft started
      const draftEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'draft-completed' }
      });
      setTimeout(() => {
        captionProgressEmitter.dispatchEvent(draftEvent);
      }, 1000);

      // Wait some time for critique phase
      const critiqueEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'critique-completed' }
      });
      setTimeout(() => {
        captionProgressEmitter.dispatchEvent(critiqueEvent);
      }, 2000);

      // Wait some time for revision phase
      const revisionEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'revision-completed' }
      });
      setTimeout(() => {
        captionProgressEmitter.dispatchEvent(revisionEvent);
      }, 3000);

      // Generate the caption with PuterJS
      // This is a simulation since we're not actually using PuterJS API
      // In a real implementation, you would make a call to the PuterJS API here
      const caption = await generateCaptionWithPuter(platform, params);
      
      // Emit completion event
      const finalEvent = new CustomEvent('captionProgress', {
        detail: { platform, status: 'completed', caption }
      });
      captionProgressEmitter.dispatchEvent(finalEvent);
      
      return { platform, caption };
    });

    // Wait for all captions to be generated
    const captionResults = await Promise.all(captionPromises);
    
    // Populate results object
    captionResults.forEach(({ platform, caption }) => {
      results[platform] = caption;
    });

    // Return results based on number of platforms
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

/**
 * Simulated PuterJS caption generation
 */
async function generateCaptionWithPuter(
  platform: string,
  params: CaptionParams
): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Generate caption based on platform and params
  const { 
    tone, 
    style, 
    includeEmojis, 
    includeHashtags, 
    language, 
    description, 
    audience, 
    keywords, 
    cta,
    captionLength 
  } = params;
  
  let caption = '';
  
  // Create a hook based on platform
  const hooks = {
    instagram: ["Double tap if you agree!", "Need this in your life?", "Swipe up to learn more!"],
    facebook: ["Who else agrees?", "Share this with someone who needs to see it", "Tell us your thoughts below!"],
    twitter: ["RT if you agree!", "What's your take on this?", "Let's discuss!"],
    linkedin: ["Agree or disagree?", "What's been your experience?", "Thoughts on this approach?"],
    tiktok: ["POV:", "Wait for it...", "The way that..."],
    youtube: ["You won't believe what happens next!", "Watch until the end!", "Like and subscribe!"],
    pinterest: ["Must save for later!", "Try this today!", "Your next project?"],
    whatsapp: ["Pass this on!", "Important info to share!", "Something you need to know!"]
  };
  
  // Default hook if platform not found
  const defaultHooks = ["Check this out!", "You'll want to see this!", "Don't miss this!"];
  const platformHooks = (hooks as any)[platform] || defaultHooks;
  const hook = platformHooks[Math.floor(Math.random() * platformHooks.length)];
  
  // Start with a strong hook
  caption += `${hook}\n\n`;
  
  // Add description-based content
  if (description) {
    caption += `${description.substring(0, 100)}\n\n`;
    
    // Add more context based on the description
    if (description.length > 100) {
      caption += `${description.substring(100, 200)}...\n\n`;
    }
  }
  
  // Add audience targeting
  if (audience) {
    caption += `Perfect for ${audience}!\n\n`;
  }
  
  // Add call to action
  if (cta) {
    caption += `${cta}\n\n`;
  }
  
  // Add keywords as hashtags if requested
  if (includeHashtags && keywords.length > 0) {
    caption += '\n';
    keywords.forEach(keyword => {
      caption += `#${keyword.replace(/\s+/g, '')} `;
    });
  }
  
  // Add emojis if requested
  if (includeEmojis) {
    const emojis = ['✨', '🔥', '👍', '💯', '🚀', '💪', '🎉', '👏', '❤️', '😊'];
    const numEmojis = Math.floor(Math.random() * 3) + 1; // 1-3 emojis
    
    caption += '\n';
    for (let i = 0; i < numEmojis; i++) {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      caption += randomEmoji;
    }
  }
  
  // Adjust caption length
  if (captionLength === 'short') {
    caption = caption.split('\n\n').slice(0, 2).join('\n\n');
  } else if (captionLength === 'long') {
    // Add extra details for long captions
    caption += '\n\nThanks for reading! Don\'t forget to engage with this post for better reach!';
  }
  
  return caption;
}

interface GenerateCaptionParams {
  apiKey: string;
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
  captionLength?: string;
}

// Create an event emitter for updating captions progressively
export const captionProgressEmitter = new EventTarget();

export async function generateCaption({
  apiKey,
  platform,
  tone,
  style,
  includeEmojis,
  includeHashtags,
  language,
  description,
  audience,
  keywords,
  cta,
  captionLength = 'medium'
}: GenerateCaptionParams): Promise<string | Record<string, string>> {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  
  // Convert platforms to array if it's not already
  const platforms = Array.isArray(platform) ? platform : [platform];
  const results: Record<string, string> = {};
  
  // Function to generate a single caption
  async function generateSingleCaption(currentPlatform: string): Promise<string> {
    
    // Create an AI self-critique cycle for the prompt
    async function generateWithSelfCritique(): Promise<string> {
      // Base system prompt for the initial caption generation
      const baseSystemPrompt = style === 'memes' 
        ? `You are a viral content creator who understands internet culture and creates highly shareable, relatable content. You craft content that people immediately want to share with friends, using humor, relatability, and current trends without being forced or obvious about it. You must follow all instructions exactly and return only the caption text—no explanations, formatting, or extra content.`
        : `You are Traption, a professional social media copywriter with expert-level knowledge of ${currentPlatform} best practices. 
You must follow all instructions exactly and return only the caption text—no explanations, formatting, or extra content. Do not add anything that is not requested.`;
      
      const baseUserPrompt = style === 'memes' 
        ? `
Create highly shareable, viral content that people immediately want to share with friends.

Content creation rules:

- Transform this topic into something hilariously relatable: ${description}
- Use humor, irony, and current internet culture naturally
- Create content that feels like it came from a friend, not a brand
- Make it quotable and instantly shareable
- Connect with real emotions and experiences people have
- Naturally incorporate these themes if they fit: ${keywords.length > 0 ? keywords.join(', ') : 'none'}
${cta ? `- Include this action naturally: ${cta}` : ''}

Additional context:
- Platform: ${currentPlatform}
- Tone: ${tone}
- Language: ${language}
- Target audience: ${audience || 'Internet users'}
- Include emojis: ${includeEmojis ? 'yes' : 'no'}
- Include hashtags: ${includeHashtags ? 'yes' : 'no'}
- Length: ${captionLength || 'medium'}`
        : `
Write a highly engaging and well-structured ${captionLength || 'medium'} length caption for ${currentPlatform}.

The caption must follow these rules:

- Start with a strong hook to capture attention immediately.
- Follow with value, insight, or emotional storytelling related to this content: ${description}
- End with this Call to Action: ${cta || 'None specified'}.
- Optimize for engagement, relatability, and shareability using proven practices on ${currentPlatform}.
- Naturally include these keywords: ${keywords.length > 0 ? keywords.join(', ') : 'none'}. Do not force them—blend them into the text.
- Follow SEO principles relevant to ${currentPlatform} captions.
- Respect the platform's character limits and format expectations.

Additional context:
- Tone: ${tone}
- Style: ${style}
- Language: ${language}
- Target audience: ${audience || 'General audience'}
- Include emojis: ${includeEmojis ? 'yes' : 'no'}
- Include hashtags: ${includeHashtags ? 'yes' : 'no'}
- Caption length: ${captionLength || 'medium'}`
        
        + `

Strict rules:
- Do not generate anything outside the specified language.
- Do not include emojis or hashtags unless explicitly allowed above.
- Do not explain. Return only the caption text.
`.trim();
      
      // First draft generation
      try {
        const draftCaption = await fetchCaptionFromAPI(baseSystemPrompt, baseUserPrompt);
        
        // Emit progress event for first draft
        const progressEvent = new CustomEvent('captionProgress', { 
          detail: { platform: currentPlatform, status: 'draft-completed', caption: draftCaption }
        });
        captionProgressEmitter.dispatchEvent(progressEvent);
        
        // First self-critique cycle
        const critiqueSystemPrompt = `You are a critical social media expert who evaluates caption quality for ${currentPlatform}. 
Identify specific weaknesses in the caption and provide concise, actionable feedback. Focus on engagement, hook strength, tone consistency, keyword usage, and platform fit.`;
        
        const critiqueUserPrompt = `
Review this caption for ${currentPlatform} and identify its weaknesses:

"${draftCaption}"

Provide brief, specific critique points only. No explanations or praise.`.trim();
        
        const critique = await fetchCaptionFromAPI(critiqueSystemPrompt, critiqueUserPrompt);
        
        // Emit progress event for critique
        const critiqueEvent = new CustomEvent('captionProgress', { 
          detail: { platform: currentPlatform, status: 'critique-completed' }
        });
        captionProgressEmitter.dispatchEvent(critiqueEvent);
        
        // Revision based on critique
        const revisionSystemPrompt = `You are Traption, a professional social media copywriter revising a caption for ${currentPlatform}. 
You must address all critique points while maintaining the original requirements. Return only the improved caption—no explanations.`;
        
        const revisionUserPrompt = `
Rewrite this caption for ${currentPlatform} addressing these critique points:
"${critique}"

Original caption:
"${draftCaption}"

Original requirements:
${baseUserPrompt}

Return ONLY the revised caption text.`.trim();
        
        const improvedCaption = await fetchCaptionFromAPI(revisionSystemPrompt, revisionUserPrompt);
        
        // Emit progress event for revision
        const revisionEvent = new CustomEvent('captionProgress', { 
          detail: { platform: currentPlatform, status: 'revision-completed', caption: improvedCaption }
        });
        captionProgressEmitter.dispatchEvent(revisionEvent);
        
        // Final review and polish
        const finalSystemPrompt = `You are Traption, conducting a final review of a ${currentPlatform} caption.
Ensure it perfectly matches the platform's best practices and the requested tone, style, and audience requirements. 
Make final polish adjustments but maintain the core message. Return only the polished caption.`;
        
        const finalUserPrompt = `
Give a final polish to this ${currentPlatform} caption:
"${improvedCaption}"

Ensure it matches:
- Platform: ${currentPlatform}
- Tone: ${tone}
- Style: ${style}
- Language: ${language}
- Target audience: ${audience || 'General audience'}
- Include emojis: ${includeEmojis ? 'yes' : 'no'}
- Include hashtags: ${includeHashtags ? 'yes' : 'no'}

Return ONLY the final polished caption.`.trim();
        
        const finalCaption = await fetchCaptionFromAPI(finalSystemPrompt, finalUserPrompt);
        
        // Emit final completion event
        const finalEvent = new CustomEvent('captionProgress', { 
          detail: { platform: currentPlatform, status: 'completed', caption: finalCaption }
        });
        captionProgressEmitter.dispatchEvent(finalEvent);
        
        return finalCaption;
      } catch (error: any) {
        console.error(`Error during self-critique process:`, error);
        throw new Error(error.message || `Failed to generate caption with self-critique for ${currentPlatform}`);
      }
    }
    
    // Helper function to make API calls
    async function fetchCaptionFromAPI(systemPrompt: string, userPrompt: string): Promise<string> {
      try {
        // For mock development or if API is not accessible
        if (process.env.NODE_ENV === 'development' && Math.random() > 0.7) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
          
          // Mock response based on platform
          return `This is a mock caption for ${currentPlatform}. 
${description ? `About: ${description.substring(0, 30)}...` : ''}
${audience ? `For: ${audience}` : ''}
${keywords.length > 0 ? `Keywords: ${keywords.join(', ')}` : ''}
${cta ? `CTA: ${cta}` : ''}
${includeEmojis ? '🔥 👍 ✨' : ''}
${includeHashtags ? `#${currentPlatform.toLowerCase()} #traption #content` : ''}`;
        }
        
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://traption.vercel.app',
            'X-Title': 'Traption',
          },
          body: JSON.stringify({
            model: 'mistralai/mistral-7b-instruct',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
          })
        });
        
        // Check if the response is valid
        const text = await response.text();
        let result;
        
        // Try to parse as JSON
        try {
          result = JSON.parse(text);
        } catch (e) {
          // If not valid JSON, handle the error
          if (text.includes('Not Found')) {
            throw new Error('API Error: Service not found. Please check your API key and try again.');
          }
          throw new Error(`API Error: ${text}`);
        }
        
        if (!response.ok || !result.choices || !result.choices[0]?.message?.content) {
          throw new Error(`API Error: ${JSON.stringify(result)}`);
        }
        
        return result.choices[0].message.content.trim();
      } catch (error: any) {
        console.error(`Error fetching from API for ${currentPlatform}:`, error);
        throw new Error(error.message || `Failed to generate caption for ${currentPlatform}`);
      }
    }
    
    return await generateWithSelfCritique();
  }
  
  // Generate captions for all platforms - now in parallel
  const captionPromises = platforms.map(async (currentPlatform) => {
    try {
      // Set initial loading state
      const initialEvent = new CustomEvent('captionProgress', {
        detail: { platform: currentPlatform, status: 'started' }
      });
      captionProgressEmitter.dispatchEvent(initialEvent);
      
      // Generate caption
      const caption = await generateSingleCaption(currentPlatform);
      results[currentPlatform] = caption;
      return { platform: currentPlatform, caption };
    } catch (error: any) {
      const errorEvent = new CustomEvent('captionProgress', {
        detail: { platform: currentPlatform, status: 'error', error: error.message }
      });
      captionProgressEmitter.dispatchEvent(errorEvent);
      
      results[currentPlatform] = `Error: ${error.message}`;
      return { platform: currentPlatform, error: error.message };
    }
  });
  
  // Wait for all caption generation to complete
  await Promise.all(captionPromises);
  
  // If only one platform was requested, return just the string for backward compatibility
  return platforms.length === 1 ? results[platforms[0]] : results;
}

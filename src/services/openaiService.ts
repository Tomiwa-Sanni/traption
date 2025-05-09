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
}

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
  cta
}: GenerateCaptionParams): Promise < string | Record < string, string >> {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  
  // Convert platforms to array if it's not already
  const platforms = Array.isArray(platform) ? platform : [platform];
  const results: Record < string, string > = {};
  
  // Function to generate a single caption
  async function generateSingleCaption(currentPlatform: string): Promise < string > {
    
    const systemPrompt = `You are Traption, a professional social media copywriter with expert-level knowledge of ${currentPlatform} best practices. 
You must follow all instructions exactly and return only the caption text—no explanations, formatting, or extra content. Do not add anything that is not requested.`;
    
    const userPrompt = `
Write a highly engaging and well-structured caption for ${currentPlatform}.

The caption must follow these rules:

- Start with a strong hook to capture attention immediately.
- Follow with value, insight, or emotional storytelling related to this content: ${description}
- End with this Call to Action: ${cta || 'None specified'}.
- Optimize for engagement, relatability, and shareability using proven practices on ${currentPlatform}.
- Naturally include these keywords: ${keywords.length > 0 ? keywords.join(', ') : 'none'}. Do not force them—blend them into the text.
- Follow SEO principles relevant to ${currentPlatform} captions.
- Respect the platform’s character limits and format expectations.

Additional context:
- Tone: ${tone}
- Style: ${style}
- Language: ${language}
- Target audience: ${audience || 'General audience'}
- Include emojis: ${includeEmojis ? 'yes' : 'no'}
- Include hashtags: ${includeHashtags ? 'yes' : 'no'}

Strict rules:
- Do not generate anything outside the specified language.
- Do not include emojis or hashtags unless explicitly allowed above.
- Do not explain. Return only the caption text.
`.trim();
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, // <-- from form
          'HTTP-Referer': 'https://traption.vercel.app', // required
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
      
      const result = await response.json();
      
      if (!response.ok || !result.choices || !result.choices[0]?.message?.content) {
        throw new Error(`API Error: ${JSON.stringify(result)}`);
      }
      
      return result.choices[0].message.content.trim();
    } catch (error: any) {
      console.error(`Error generating caption for ${currentPlatform}:`, error);
      throw new Error(error.message || `Failed to generate caption for ${currentPlatform}`);
    }
  }
  
  // Generate captions for all platforms
  for (const currentPlatform of platforms) {
    try {
      results[currentPlatform] = await generateSingleCaption(currentPlatform);
    } catch (error: any) {
      results[currentPlatform] = `Error: ${error.message}`;
    }
  }
  
  // If only one platform was requested, return just the string for backward compatibility
  return platforms.length === 1 ? results[platforms[0]] : results;
}
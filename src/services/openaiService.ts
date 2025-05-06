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
  async function generateSingleCaption(currentPlatform: string): Promise<string> {
  const systemPrompt = `You are Traption, an expert social media copywriter with deep knowledge of ${currentPlatform} best practices. 
  Create a compelling ${currentPlatform} caption with these specifications:
  - Tone: ${tone}
  - Style: ${style}
  - Language: ${language}
  - ${includeEmojis ? 'Include relevant emojis throughout the caption' : 'Do not use emojis'}
  - ${includeHashtags ? 'Include 3-5 relevant hashtags at the end' : 'Do not include hashtags'}
  - Target audience: ${audience || 'General audience'}
  - Call to Action: ${cta || 'None specified'}
  
  Return only the caption text, no explanations or additional comments.`;

  const userPrompt = `
  Create a ${currentPlatform} caption for the following:
  
  Content description: ${description}
  ${keywords.length > 0 ? `Keywords to include: ${keywords.join(', ')}` : ''}
  ${audience ? `Target audience: ${audience}` : ''}
  ${cta ? `Call to action: ${cta}` : ''}
  
  Make the caption appropriate for ${currentPlatform}, following its character limitations and best practices.
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourdomain.com', // Replace with your actual domain or portfolio
        'X-Title': 'Traption', // Your app or project name
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
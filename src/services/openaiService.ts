
interface GenerateCaptionParams {
  apiKey: string;
  platform: string;
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
}: GenerateCaptionParams): Promise<string> {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const systemPrompt = `You are Traption, an expert social media copywriter with deep knowledge of ${platform} best practices. 
  Create a compelling ${platform} caption with these specifications:
  - Tone: ${tone}
  - Style: ${style}
  - Language: ${language}
  - ${includeEmojis ? 'Include relevant emojis throughout the caption' : 'Do not use emojis'}
  - ${includeHashtags ? 'Include 3-5 relevant hashtags at the end' : 'Do not include hashtags'}
  - Target audience: ${audience || 'General audience'}
  - Call to Action: ${cta || 'None specified'}
  
  Return only the caption text, no explanations or additional comments.`;

  const userPrompt = `
  Create a ${platform} caption for the following:
  
  Content description: ${description}
  ${keywords.length > 0 ? `Keywords to include: ${keywords.join(', ')}` : ''}
  ${audience ? `Target audience: ${audience}` : ''}
  ${cta ? `Call to action: ${cta}` : ''}
  
  Make the caption appropriate for ${platform}, following its character limitations and best practices.
  `;

  try {
    // Using HuggingFace's free API instead of OpenAI
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: userPrompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
        }
      })
    });

    const text = await response.text();
    
    try {
      // Try to parse as JSON first
      const data = JSON.parse(text);
      return data.generated_text || 'Unable to generate caption. Please try again.';
    } catch (jsonError) {
      // If not valid JSON, check if it's an error message
      if (text.includes('Not Found') || text.includes('Error')) {
        throw new Error(`API Error: ${text}`);
      }
      // Just return the text as is if not JSON
      return text;
    }
  } catch (error: any) {
    console.error('Error generating caption:', error);
    throw new Error(error.message || 'Failed to generate caption');
  }
}

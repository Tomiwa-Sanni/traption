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
      // Using a mock response since the Hugging Face API seems to be returning errors
      // This will simulate successful API responses for now
      /*const mockResponses: Record<string, string> = {
        instagram: `✨ ${description}\n\nPerfect for your ${audience || 'followers'} to enjoy! ${cta}\n\n#contentcreator #socialmedia #engagement`,
        facebook: `${description}\n\nPerfect for your ${audience || 'friends'} to enjoy! ${cta}`,
        twitter: `${description.substring(0, 200)}... ${cta} #trending`,
        linkedin: `Professional insight: ${description}\n\nTargeted for ${audience || 'professionals'}\n\n${cta}`,
        tiktok: `${description} 🔥 #fyp #viral #trending`,
        pinterest: `${description} | Perfect inspiration for your boards! ${cta}`,
        youtube: `${description} | Watch now and ${cta || 'subscribe for more'}!`,
        google: `${description} | ${cta || 'Contact us today!'}`
      };
      
      return mockResponses[currentPlatform] || `Here's a caption for ${currentPlatform}: ${description}. ${cta}`;*/
      
      
      
      //Commenting out the actual API call for now since it's returning errors
      /*const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
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

       // Get response as text first
       const text = await response.text();
       
       // Handle the response appropriately
       if (text.includes('Not Found') || text.includes('Error')) {
         throw new Error(`API Error: ${text}`);
       }
       
       try {
         // Try to parse as JSON
         const data = JSON.parse(text);
         return data.generated_text || 'Unable to generate caption. Please try again.';
       } catch (jsonError) {
         // If not valid JSON and not an error message, return the text
         return text;
       }*/
      
      const response = await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `${systemPrompt}\n\n${userPrompt}`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
          }
        })
      });
      
      const text = await response.text();
      
      if (!response.ok) {
        throw new Error(`API Error: ${text}`);
      }
      
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        throw new Error(`Failed to parse JSON: ${text}`);
      }
      
      if (!Array.isArray(result) || !result[0]?.generated_text) {
        throw new Error(`Unexpected response format: ${JSON.stringify(result)}`);
      }
      
      return result[0].generated_text.trim();
      
      
      
      
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
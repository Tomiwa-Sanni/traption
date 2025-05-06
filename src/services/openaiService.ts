
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
  Create a compelling ${platform} caption that is optimized for engagement on this specific platform.`;
  
  const styleGuide = {
    'hook-story-offer': "Start with an attention-grabbing hook, tell a brief story, then present an offer or value proposition",
    'problem-agitate-solution': "Identify a problem, emphasize its impact, then present a solution",
    'listicle': "Create a numbered list of points, tips, or benefits",
    'question-based': "Use thought-provoking questions to engage the audience"
  };

  let emoji = includeEmojis ? "Include relevant emojis throughout the caption to increase engagement" : "Do not include emojis";
  let hashtags = includeHashtags ? `Include 3-5 relevant hashtags that would perform well on ${platform}` : "Do not include hashtags";

  const userPrompt = `
  Create a ${tone} caption for a ${platform} post.
  Post description: ${description}
  Target audience: ${audience}
  Keywords to include: ${keywords.join(', ')}
  Call to action: ${cta}
  Caption style: ${styleGuide[style as keyof typeof styleGuide] || "Create an engaging narrative"}
  ${emoji}.
  ${hashtags}.
  Write the caption in ${language}.
  
  The caption should be optimized for ${platform}'s character limits and best practices. 
  Make sure it's engaging and likely to drive the desired action from the target audience.
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

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate caption');
    }

    const data = await response.json();
    // HuggingFace response format is different from OpenAI
    return data.generated_text || 'Unable to generate caption. Please try again.';
  } catch (error: any) {
    console.error('Error generating caption:', error);
    throw new Error(error.message || 'Failed to generate caption');
  }
}

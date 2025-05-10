
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { 
      platforms, tone, style, includeEmojis, includeHashtags, 
      language, description, audience, keywords, cta, captionLength 
    } = body;
    
    // Use environment variable for API key
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error("API key not configured on server");
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "API key not configured on server" })
      };
    }

    // Generate captions for all platforms
    const results = {};
    
    for (const platform of platforms) {
      try {
        console.log(`Generating caption for ${platform}...`);
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
              { 
                role: 'system', 
                content: `You are Traption, a professional social media copywriter with expert-level knowledge of ${platform} best practices. 
                          You must follow all instructions exactly and return only the caption text—no explanations, formatting, or extra content.` 
              },
              { 
                role: 'user', 
                content: `Write a highly engaging and well-structured ${captionLength || 'medium'} length caption for ${platform}.

                          The caption must follow these rules:
                          
                          - Start with a strong hook to capture attention immediately.
                          - Follow with value, insight, or emotional storytelling related to this content: ${description}
                          - End with this Call to Action: ${cta || 'None specified'}.
                          - Optimize for engagement, relatability, and shareability using proven practices on ${platform}.
                          - Naturally include these keywords: ${keywords.length > 0 ? keywords.join(', ') : 'none'}. Do not force them—blend them into the text.
                          - Follow SEO principles relevant to ${platform} captions.
                          - Respect the platform's character limits and format expectations.
                          
                          Additional context:
                          - Tone: ${tone}
                          - Style: ${style}
                          - Language: ${language}
                          - Target audience: ${audience || 'General audience'}
                          - Include emojis: ${includeEmojis ? 'yes' : 'no'}
                          - Include hashtags: ${includeHashtags ? 'yes' : 'no'}
                          - Caption length: ${captionLength || 'medium'}
                          
                          Strict rules:
                          - Do not generate anything outside the specified language.
                          - Do not include emojis or hashtags unless explicitly allowed above.
                          - Do not explain. Return only the caption text.`
              }
            ]
          })
        });
        
        const data = await response.json();
        console.log(`Response status for ${platform}:`, response.status);
        
        if (!response.ok || !data.choices || !data.choices[0]?.message?.content) {
          console.error(`Error generating caption for ${platform}:`, data.error || "API response error");
          results[platform] = `Error: ${data.error || "Failed to generate caption"}`;
        } else {
          results[platform] = data.choices[0].message.content.trim();
        }
      } catch (error) {
        console.error(`Error generating caption for ${platform}:`, error);
        results[platform] = `Error: ${error.message || "Unknown error"}`;
      }
    }
    
    // Ensure we have some results before returning
    if (Object.keys(results).length === 0) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to generate any captions" })
      };
    }

    console.log("Successfully generated captions for platforms:", Object.keys(results));
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    console.error('General error in function:', error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Internal Server Error" })
    };
  }
};


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailData {
  email: string;
  token_hash: string;
  type: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token_hash, type }: EmailData = await req.json();
    
    const confirmationUrl = `https://traption.netlify.app/auth/confirm?token_hash=${token_hash}&type=${type}&next=/dashboard`;

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email - Traption</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 40px 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
        }
        .description {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            transition: transform 0.2s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .features {
            background: rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
        }
        .features h3 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .features ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .features li {
            padding: 8px 0;
            color: #4a5568;
            border-bottom: 1px solid rgba(102, 126, 234, 0.1);
        }
        .features li:last-child { border-bottom: none; }
        .features li:before {
            content: "✨";
            margin-right: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid rgba(102, 126, 234, 0.2);
            color: #718096;
            font-size: 14px;
        }
        .security-note {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #047857;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Traption</div>
            <h1 class="welcome-text">Welcome to Traption! 🎉</h1>
        </div>
        
        <p class="description">
            Thank you for joining Traption, the AI-powered social media caption generator that helps content creators save time and boost engagement across all platforms.
        </p>
        
        <div style="text-align: center;">
            <a href="${confirmationUrl}" class="cta-button">
                Confirm Your Email Address
            </a>
        </div>
        
        <div class="features">
            <h3>What you'll get access to:</h3>
            <ul>
                <li>AI-powered caption generation for all major platforms</li>
                <li>Platform-specific optimization and hashtag suggestions</li>
                <li>Multiple tone and style options</li>
                <li>Batch caption generation for efficient workflows</li>
                <li>Analytics and performance tracking</li>
                <li>Priority access to new features and tools</li>
            </ul>
        </div>
        
        <div class="security-note">
            <strong>Security Note:</strong> This confirmation link is valid for 24 hours and will expire for your security. If you didn't create an account with Traption, please ignore this email.
        </div>
        
        <div class="footer">
            <p>Need help? Reply to this email or visit our <a href="https://traption.netlify.app/contact" style="color: #667eea;">support page</a>.</p>
            <p>© 2025 Traption. All rights reserved.</p>
            <p style="margin-top: 15px; font-size: 12px;">
                Traption • Lagos, Nigeria<br>
                <a href="https://traption.netlify.app/privacy" style="color: #718096;">Privacy Policy</a> • 
                <a href="https://traption.netlify.app/terms" style="color: #718096;">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
    `;

    const { error } = await resend.emails.send({
      from: 'Traption <onboarding@resend.dev>',
      to: [email],
      subject: '🎉 Welcome to Traption! Confirm your email to get started',
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in send-confirmation-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);

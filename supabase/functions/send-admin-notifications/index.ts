
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "newsletter_subscription" | "new_user_signup";
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, firstName, lastName, source }: NotificationRequest = await req.json();

    let subject = "";
    let html = "";

    if (type === "newsletter_subscription") {
      subject = "New Newsletter Subscription - Traption";
      html = `
        <h2>New Newsletter Subscription</h2>
        <p>Someone just subscribed to your newsletter on Traption!</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Source:</strong> ${source || 'Unknown'}</li>
          <li><strong>Time:</strong> ${new Date().toISOString()}</li>
        </ul>
        <p>You can view all newsletter subscriptions in your Supabase dashboard.</p>
      `;
    } else if (type === "new_user_signup") {
      subject = "New User Signup - Traption";
      html = `
        <h2>New User Registration</h2>
        <p>A new user just signed up for Traption!</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>First Name:</strong> ${firstName || 'Not provided'}</li>
          <li><strong>Last Name:</strong> ${lastName || 'Not provided'}</li>
          <li><strong>Time:</strong> ${new Date().toISOString()}</li>
        </ul>
        <p>The user will receive a confirmation email to verify their account.</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Traption <notifications@stewpidos.buzz>",
      to: ["traption.contact@gmail.com"],
      subject: subject,
      html: html,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending admin notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

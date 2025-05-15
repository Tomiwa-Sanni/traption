
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "welcome" | "reminder" | "scheduled_post";
  userId?: string;
  email?: string;
  postId?: string;
  data?: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { type, userId, email, postId, data }: NotificationRequest = await req.json();

    // Handle different notification types
    switch (type) {
      case "welcome":
        return await handleWelcomeEmail(supabaseClient, userId, email);
      case "reminder":
        return await handleReminderEmail(supabaseClient, userId, email, data);
      case "scheduled_post":
        return await handleScheduledPost(supabaseClient, postId);
      default:
        throw new Error("Invalid notification type");
    }
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

async function handleWelcomeEmail(supabase, userId, email) {
  if (!userId && !email) {
    throw new Error("UserId or email is required");
  }
  
  // If only userId is provided, fetch the user's email
  if (userId && !email) {
    const { data, error } = await supabase.auth.admin.getUserById(userId);
    
    if (error || !data.user) {
      throw new Error("Failed to retrieve user information");
    }
    
    email = data.user.email;
  }
  
  // Here you would integrate with an email service
  // For now, we'll just simulate sending an email
  console.log(`Welcome email sent to ${email}`);
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: `Welcome email sent to ${email}`,
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

async function handleReminderEmail(supabase, userId, email, data) {
  if (!userId && !email) {
    throw new Error("UserId or email is required");
  }
  
  // If only userId is provided, fetch the user's email
  if (userId && !email) {
    const { data: userData, error } = await supabase.auth.admin.getUserById(userId);
    
    if (error || !userData.user) {
      throw new Error("Failed to retrieve user information");
    }
    
    email = userData.user.email;
  }
  
  const reminderType = data?.reminderType || "general";
  const scheduledTime = data?.scheduledTime || "soon";
  const platform = data?.platform || "your platform";
  
  // Here you would integrate with an email service
  console.log(`Reminder email (${reminderType}) sent to ${email} for post scheduled at ${scheduledTime} on ${platform}`);
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: `Reminder email sent to ${email}`,
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

async function handleScheduledPost(supabase, postId) {
  if (!postId) {
    throw new Error("PostId is required");
  }
  
  // Fetch the scheduled post
  const { data: post, error: postError } = await supabase
    .from("scheduled_posts")
    .select("*, user:user_id(*)")
    .eq("id", postId)
    .single();
  
  if (postError || !post) {
    throw new Error("Failed to retrieve scheduled post");
  }
  
  // Update the post status
  const { error: updateError } = await supabase
    .from("scheduled_posts")
    .update({ status: "sent", updated_at: new Date().toISOString() })
    .eq("id", postId);
  
  if (updateError) {
    throw new Error("Failed to update post status");
  }
  
  console.log(`Post ${postId} marked as sent for user ${post.user_id}`);
  
  return new Response(
    JSON.stringify({ 
      success: true, 
      message: `Post ${postId} processed successfully`,
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

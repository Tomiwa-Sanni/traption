
-- Create a table for newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT NOT NULL, -- 'signup' or 'coming_soon'
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Add Row Level Security (RLS)
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting newsletter subscriptions (public access for signup)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for selecting (only admins can view all subscriptions)
CREATE POLICY "Admins can view all newsletter subscriptions" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND (auth.users.raw_user_meta_data->>'is_admin')::boolean = true
  ));

-- Add newsletter_consent column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN newsletter_consent BOOLEAN DEFAULT false;

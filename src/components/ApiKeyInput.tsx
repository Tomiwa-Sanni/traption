
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKey } from '@/hooks/useApiKey';
import { Eye, EyeOff, Save, Trash } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function ApiKeyInput() {
  const { apiKey, saveApiKey, clearApiKey } = useApiKey();
  const [showApiKey, setShowApiKey] = useState(false);
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-primary" />
            Caption Generator
          </CardTitle>
          <CardDescription>
            Our caption generator is ready to use! The API key is securely stored on the server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-primary/10 border-primary/20">
            <InfoIcon className="h-4 w-4 text-primary" />
            <AlertTitle>Generate captions instantly</AlertTitle>
            <AlertDescription>
              Create engaging, platform-optimized social media captions with our AI-powered generator. Just fill in the details below.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </>
  );
}

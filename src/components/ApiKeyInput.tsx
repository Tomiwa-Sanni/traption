
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export function ApiKeyInput() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5 text-primary" />
          Caption Generator
        </CardTitle>
        <CardDescription>
          Our caption generator uses PuterJS to create engaging social media captions.
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
  );
}

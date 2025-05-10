import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKey } from '@/hooks/useApiKey';
import { Eye, EyeOff, Key, Save, Trash } from 'lucide-react';
import AdSense from "@/components/AdSense";

export function ApiKeyInput() {
  const { apiKey, saveApiKey, clearApiKey } = useApiKey();
  const [inputApiKey, setInputApiKey] = useState(apiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);
  
  const handleSave = () => {
    saveApiKey(inputApiKey);
    window.location.reload()
  };
  
  const handleClear = () => {
    clearApiKey();
    setInputApiKey('');
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  return (
    <>
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-traption-purple" />
          OpenRouter API Key
        </CardTitle>
        <CardDescription>
          Your API key is stored locally in your browser and never sent to our servers. Get a free API key at <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">OpenRouter</a>. <code>Copy and Paste Here</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="Enter your OpenRouter API key"
              value={inputApiKey}
              onChange={(e) => setInputApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full"
              onClick={toggleShowApiKey}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear} disabled={!apiKey}>
          <Trash className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save API Key
        </Button>
      </CardFooter>
    </Card>
    {/*<AdSense
      adClient="ca-pub-6274496150668837"
      adSlot="6335536534"
      adFormat="fluid"
      layoutKey="-f7+5u+4t-da+6l"
    />*/}
{/*    <div className="ads">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6274496150668837" crossorigin="anonymous"></script>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-layout-key="-f7+5u+4t-da+6l"
        data-ad-client="ca-pub-6274496150668837"
        data-ad-slot="6335536534"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>*/}
  </>
  );
}
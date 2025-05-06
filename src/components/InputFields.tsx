
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface InputFieldsProps {
  description: string;
  setDescription: (description: string) => void;
  audience: string;
  setAudience: (audience: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  cta: string;
  setCta: (cta: string) => void;
}

export function InputFields({
  description,
  setDescription,
  audience,
  setAudience,
  keywords,
  setKeywords,
  cta,
  setCta,
}: InputFieldsProps) {
  const [keywordInput, setKeywordInput] = useState('');

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Post Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what your post is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Input
            id="audience"
            placeholder="Who is your content targeting?"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (Press Enter to add)</Label>
          <Input
            id="keywords"
            placeholder="Add keywords to include..."
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={addKeyword}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                  onClick={() => removeKeyword(keyword)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta">Call to Action</Label>
          <Input
            id="cta"
            placeholder="What action should your audience take?"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

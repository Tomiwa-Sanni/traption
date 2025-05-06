import { useState, useEffect } from 'react';
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

  // Store form values in local storage
  useEffect(() => {
    // Save current values to localStorage whenever they change
    const saveToLocalStorage = () => {
      localStorage.setItem('traption_description', description);
      localStorage.setItem('traption_audience', audience);
      localStorage.setItem('traption_keywords', JSON.stringify(keywords));
      localStorage.setItem('traption_cta', cta);
    };
    
    saveToLocalStorage();
  }, [description, audience, keywords, cta]);

  // Load values from localStorage on initial render
  useEffect(() => {
    const savedDescription = localStorage.getItem('traption_description');
    const savedAudience = localStorage.getItem('traption_audience');
    const savedKeywords = localStorage.getItem('traption_keywords');
    const savedCta = localStorage.getItem('traption_cta');
    
    if (savedDescription) setDescription(savedDescription);
    if (savedAudience) setAudience(savedAudience);
    if (savedKeywords) {
      try {
        const parsedKeywords = JSON.parse(savedKeywords);
        if (Array.isArray(parsedKeywords)) {
          setKeywords(parsedKeywords);
        }
      } catch (e) {
        console.error('Error parsing keywords from localStorage:', e);
      }
    }
    if (savedCta) setCta(savedCta);
  }, []);

  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
    
    // Process keywords on comma
    if (e.target.value.includes(',')) {
      const newKeywords = e.target.value.split(',').map(k => k.trim()).filter(k => k !== '');
      
      // Add new keywords that don't already exist
      const uniqueNewKeywords = newKeywords.filter(k => !keywords.includes(k));
      if (uniqueNewKeywords.length > 0) {
        setKeywords([...keywords, ...uniqueNewKeywords]);
      }
      
      // Clear the input or keep the part after the last comma
      const lastPart = e.target.value.split(',').pop() || '';
      setKeywordInput(lastPart.trim());
    }
  };

  const handleKeywordInputBlur = () => {
    // Add any remaining text as a keyword when the input loses focus
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
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
          <Label htmlFor="keywords">Keywords (Separate with commas)</Label>
          <Input
            id="keywords"
            placeholder="Add keywords separated by commas..."
            value={keywordInput}
            onChange={handleKeywordInputChange}
            onBlur={handleKeywordInputBlur}
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

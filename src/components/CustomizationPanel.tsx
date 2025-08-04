
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CustomizationPanelProps {
  tone: string;
  setTone: (tone: string) => void;
  style: string;
  setStyle: (style: string) => void;
  includeEmojis: boolean;
  setIncludeEmojis: (include: boolean) => void;
  includeHashtags: boolean;
  setIncludeHashtags: (include: boolean) => void;
  language: string;
  setLanguage: (language: string) => void;
  captionLength?: string;
  setCaptionLength?: (length: string) => void;
}

export function CustomizationPanel({
  tone,
  setTone,
  style,
  setStyle,
  includeEmojis,
  setIncludeEmojis,
  includeHashtags,
  setIncludeHashtags,
  language,
  setLanguage,
  captionLength = 'medium',
  setCaptionLength = () => {},
}: CustomizationPanelProps) {
  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'witty', label: 'Witty' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'promotional', label: 'Promotional' },
  ];

  const styles = [
    { value: 'hook-story-offer', label: 'Hook-Story-Offer' },
    { value: 'problem-agitate-solution', label: 'Problem-Agitate-Solution' },
    { value: 'listicle', label: 'Listicle' },
    { value: 'question-based', label: 'Question-Based' },
    { value: 'memes', label: 'Memes' },
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Hindi', label: 'Hindi' },
  ];

  const captionLengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Tone</h3>
        <RadioGroup value={tone} onValueChange={setTone} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {tones.map((t) => (
            <div key={t.value}>
              <RadioGroupItem
                value={t.value}
                id={`tone-${t.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`tone-${t.value}`}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-card p-2 text-center text-sm peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
              >
                {t.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Caption Style</h3>
        <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((s) => (
            <div key={s.value}>
              <RadioGroupItem
                value={s.value}
                id={`style-${s.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`style-${s.value}`}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-card p-2 text-center text-sm peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
              >
                {s.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Caption Length</h3>
        <RadioGroup value={captionLength} onValueChange={setCaptionLength} className="grid grid-cols-3 gap-2">
          {captionLengths.map((length) => (
            <div key={length.value}>
              <RadioGroupItem
                value={length.value}
                id={`length-${length.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`length-${length.value}`}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-card p-2 text-center text-sm peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
              >
                {length.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Options</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="emojis">Include Emojis</Label>
              <div className="text-xs text-muted-foreground">Add relevant emojis to caption</div>
            </div>
            <Switch
              id="emojis"
              checked={includeEmojis}
              onCheckedChange={setIncludeEmojis}
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="hashtags">Include Hashtags</Label>
              <div className="text-xs text-muted-foreground">Add relevant hashtags</div>
            </div>
            <Switch
              id="hashtags"
              checked={includeHashtags}
              onCheckedChange={setIncludeHashtags}
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="language">Language</Label>
              <div className="text-xs text-muted-foreground">Select output language</div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

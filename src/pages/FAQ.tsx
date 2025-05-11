
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const FAQ = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does Traption work?</AccordionTrigger>
            <AccordionContent>
              Traption uses AI to generate platform-specific social media captions. You simply enter your OpenAI API key, describe your content, select your platforms, adjust your preferences, and our AI will generate tailored captions for each platform.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
            <AccordionContent>
              No! Traption is designed to work without requiring any account creation. Simply provide your own OpenAI API key and you can start generating captions immediately.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, Traption is built with privacy-first principles. Your API key is stored locally on your device, and all caption generation happens directly between your browser and OpenAI. We don't store your data on our servers.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Which social media platforms are supported?</AccordionTrigger>
            <AccordionContent>
              Traption currently supports Instagram, Twitter/X, LinkedIn, Facebook, TikTok, Pinterest, WhatsApp, and you can add custom platforms as needed.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>How much does Traption cost?</AccordionTrigger>
            <AccordionContent>
              Traption is free to use. You only pay for your OpenAI API usage, which is typically very affordable for text generation. There are no subscription fees or hidden costs.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger>Can I save my generated captions?</AccordionTrigger>
            <AccordionContent>
              Currently, you can copy your generated captions directly from the app. We're working on implementing a feature to save your caption history locally.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger>What should I do if the caption generation isn't working?</AccordionTrigger>
            <AccordionContent>
              First, ensure your OpenAI API key is valid and has sufficient credit. If issues persist, try refreshing your browser or clearing your cache. For further assistance, please contact us through our Contact page.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger>Will Traption store my API key?</AccordionTrigger>
            <AccordionContent>
              No, your API key is stored only in your browser's local storage and is never sent to our servers. It remains on your device and is used only to communicate directly with OpenAI.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;

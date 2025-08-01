
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
              Traption uses advanced AI to generate platform-specific social media captions. Simply describe your content, select your platforms, adjust your preferences, and our AI will generate tailored captions for each platform. No API key required!
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need to create an account?</AccordionTrigger>
            <AccordionContent>
              No! Traption is designed to work without requiring any account creation. You can start generating captions immediately with no setup.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, Traption is built with privacy-first principles. We don't store your content on our servers once your session is complete. Your caption data remains private to your browser session.
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
              Traption is free to use. There are no subscription fees, API key costs, or hidden charges.
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
              Try refreshing your browser or clearing your cache. Make sure you've provided enough detail in your content description. For further assistance, please contact us through our Contact page.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-8">
            <AccordionTrigger>Do I need to provide my own API key?</AccordionTrigger>
            <AccordionContent>
              No, Traption now provides the AI service directly. You don't need to sign up for any external AI services or provide any API keys. Everything is included!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;

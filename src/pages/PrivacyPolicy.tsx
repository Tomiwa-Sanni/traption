
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <Card>
        <CardContent className="pt-6 prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-foreground">Last updated: May 11, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At Traption ("we," "our," or "us"), we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at traption.app.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Don't Collect</h2>
          <p>
            Traption is designed with privacy as a core principle. We do not:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 mb-4 text-muted-foreground">
            <li>Collect or store your OpenAI API key on our servers</li>
            <li>Store the content of your captions or generation requests</li>
            <li>Require account creation or collect personal information</li>
            <li>Track individual user behavior or create user profiles</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Client-Side Storage</h2>
          <p>
            Your OpenAI API key is stored only in your browser's local storage (localStorage) on your device. This means:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 mb-4 text-muted-foreground">
            <li>The API key never leaves your device except to communicate directly with OpenAI</li>
            <li>The key is stored only for your convenience so you don't need to re-enter it</li>
            <li>You can clear this data at any time by clearing your browser's local storage</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Analytics and Cookies</h2>
          <p>
            We use anonymous, aggregated analytics to understand general usage patterns of our website. These analytics do not identify individual users or track personal information. We use cookies only for essential website functionality and anonymous analytics.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Services</h2>
          <p>
            Traption interfaces with the OpenAI API using your provided API key. Any data sent to OpenAI is subject to their privacy policy. We recommend reviewing OpenAI's privacy policy to understand how they handle your data.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement reasonable security measures to protect against unauthorized access or alteration of the limited data we do collect. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us through our Contact page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;

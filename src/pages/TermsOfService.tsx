
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <Card>
        <CardContent className="pt-6 prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-foreground">Last updated: May 12, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Traption ("we," "our," or "us"). By accessing or using our website at traption.app, you agree to comply with and be bound by these Terms of Service. If you do not agree with these terms, please do not use Traption.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            Traption is an AI-powered caption generator for social media content. The service allows users to create platform-specific captions using our integrated AI technology. Our service is provided on an as-is basis, and we reserve the right to modify or discontinue any aspect of the service at any time.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
          <p>
            By using Traption, you agree that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2 mb-4 text-muted-foreground">
            <li>You will not use the service for any illegal or unauthorized purposes</li>
            <li>You will not attempt to interfere with or disrupt the service</li>
            <li>You will not copy, distribute, or reverse engineer any part of the service</li>
            <li>You are responsible for all content you generate using our service</li>
            <li>You will not use the service to generate harmful, deceptive, or malicious content</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Privacy and Data</h2>
          <p>
            Traption is designed with privacy in mind. We store minimal data and primarily use your browser's local storage to remember your preferences. Please refer to our Privacy Policy for more information on how we handle your data.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
          <p>
            All content generated through Traption belongs to you. However, Traption and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimer of Warranties</h2>
          <p>
            Traption is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free. We are not responsible for the accuracy or reliability of any content generated through the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall Traption be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or in connection with these Terms of Service or your use of the service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Your continued use of Traption after any changes indicates your acceptance of the new terms.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at traption.contact@gmail.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;

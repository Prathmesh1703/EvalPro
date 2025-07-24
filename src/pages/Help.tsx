import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Container from '@/components/Container';
import { MessageCircle, Mail, Phone, Book, Video, FileText } from 'lucide-react';

const Help: React.FC = () => {
  const faqItems = [
    {
      question: "How do I start taking tests?",
      answer: "Navigate to the 'Prepare' menu in the header and select the type of test you want to take. You can choose from Aptitude Tests, Technical Tests, or practice interviews."
    },
    {
      question: "How is my score calculated?",
      answer: "Your score is based on the percentage of correct answers. For interviews, scores are calculated based on various factors including communication skills, technical knowledge, and problem-solving approach."
    },
    {
      question: "Can I retake tests?",
      answer: "Yes, you can retake any test multiple times. However, we recommend reviewing your previous results and focusing on areas that need improvement before retaking."
    },
    {
      question: "How long are the test sessions?",
      answer: "Test durations vary: Aptitude tests are typically 30-45 minutes, Technical tests are 45-60 minutes, and mock interviews are 30-60 minutes depending on the type."
    },
    {
      question: "What happens if I lose internet connection during a test?",
      answer: "Your progress is automatically saved. When you reconnect, you can continue from where you left off, but the timer will have continued running."
    },
    {
      question: "How can I track my progress?",
      answer: "Visit your Dashboard to see overall statistics, or go to the Results page for detailed performance analytics and historical data."
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us during business hours",
      action: "Call Now",
      available: false
    }
  ];

  const resources = [
    {
      icon: Book,
      title: "User Guide",
      description: "Complete guide to using the platform"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video instructions"
    },
    {
      icon: FileText,
      title: "Best Practices",
      description: "Tips for better test performance"
    }
  ];

  return (
    <Container className="py-8 lg:ml-64">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common questions and get support when you need it
          </p>
        </div>

        {/* Quick Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <option.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={option.available ? "default" : "secondary"} 
                  className="w-full"
                  disabled={!option.available}
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to the most common questions about using EvalPro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              Explore these resources to get the most out of your preparation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <resource.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Our support team is here to help you succeed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Support Hours</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response Times</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Live Chat: Immediate</p>
                  <p>Email: Within 24 hours</p>
                  <p>Phone: During business hours</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                For urgent technical issues or billing questions, please use our live chat feature or email us directly at{' '}
                <a href="mailto:support@evalpro.com" className="text-primary hover:underline">
                  support@evalpro.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Help;
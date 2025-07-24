import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Container from '@/components/Container';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Innovation Drive", "San Francisco, CA 94105", "United States"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Monday - Friday: 9 AM - 6 PM PST"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["support@evalpro.com", "business@evalpro.com", "careers@evalpro.com"]
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: ["Monday - Friday: 9 AM - 6 PM PST", "Saturday: 10 AM - 4 PM PST", "Sunday: Closed"]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <Container className="py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our platform? Need help getting started? 
            We're here to help you succeed in your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    rows={6} 
                    placeholder="Tell us more about your inquiry..."
                    required 
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-sm text-muted-foreground">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Looking for something specific? Try these resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📚 Help Center & FAQs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎯 Platform Demo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    💼 Enterprise Solutions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🔧 Technical Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-0 bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
                <p className="text-primary-foreground/80 mb-4">
                  Our support team is available during business hours to help with urgent issues.
                </p>
                <Button variant="secondary" className="w-full">
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions we receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How quickly will I receive a response?</h4>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do you offer phone support?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, phone support is available during business hours for urgent matters.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Can I schedule a demo?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! Contact us to schedule a personalized platform demonstration.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do you offer enterprise solutions?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide custom solutions for organizations and educational institutions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Contact;
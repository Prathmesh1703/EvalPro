import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import { Target, Users, Award, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: "Targeted Preparation",
      description: "Customized assessments based on your career goals and skill level"
    },
    {
      icon: Users,
      title: "Expert Designed",
      description: "Created by industry professionals and hiring managers"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Thousands of successful candidates have improved their interview skills"
    },
    {
      icon: Zap,
      title: "Real-time Feedback",
      description: "Instant scoring and detailed performance analytics"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500K+", label: "Tests Completed" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Platform Availability" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former tech recruiter with 10+ years of hiring experience"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Software architect passionate about educational technology"
    },
    {
      name: "Emily Davis",
      role: "Head of Content",
      description: "Educational psychologist specializing in assessment design"
    }
  ];

  return (
    <Container className="py-12">
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empowering Careers Through
            <span className="text-primary"> Smart Preparation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            EvalPro is the leading candidate evaluation platform that helps job seekers 
            master their interview skills through AI-powered assessments, mock interviews, 
            and personalized feedback.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe that everyone deserves a fair chance to showcase their talents. 
              Our mission is to democratize access to high-quality interview preparation, 
              helping candidates build confidence and achieve their career goals through 
              comprehensive, data-driven assessment tools.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose EvalPro?</h2>
            <p className="text-lg text-muted-foreground">
              Our platform combines cutting-edge technology with proven assessment methodologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                EvalPro was born from a simple observation: too many talented individuals 
                were being overlooked in the hiring process, not because they lacked skills, 
                but because they weren't prepared for the interview format.
              </p>
              <p>
                Founded in 2023 by a team of former recruiters and technologists, we set out 
                to level the playing field by providing accessible, high-quality preparation 
                tools that mirror real-world interview scenarios.
              </p>
              <p>
                Today, we're proud to have helped thousands of candidates land their dream jobs 
                across various industries, from tech startups to Fortune 500 companies.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Platform Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">AI-powered question generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Real-time performance analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Industry-specific assessments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Personalized improvement recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Passionate professionals dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of candidates who have successfully improved their interview 
              skills and landed their dream jobs with EvalPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default About;
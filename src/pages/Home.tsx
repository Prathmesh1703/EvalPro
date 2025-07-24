import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Container from '@/components/Container';
import { ArrowRight, CheckCircle, Clock, Trophy, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const features = [
    {
      icon: CheckCircle,
      title: 'Comprehensive Testing',
      description: 'Aptitude tests, technical assessments, and interview simulations'
    },
    {
      icon: Clock,
      title: 'Real-time Feedback',
      description: 'Get instant results and detailed performance analytics'
    },
    {
      icon: Trophy,
      title: 'Skill Enhancement',
      description: 'Identify weaknesses and improve with targeted practice'
    },
    {
      icon: Users,
      title: 'Industry Standards',
      description: 'Tests designed by experts following industry best practices'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Container className="py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Your
              <span className="text-primary"> Interview Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Comprehensive candidate evaluation platform with professional assessments, 
              mock interviews, and detailed feedback to boost your career prospects.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button onClick={() => loginWithRedirect()} size="lg" className="text-lg px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose EvalPro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Our platform offers comprehensive preparation tools designed to help you succeed in your career journey.
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
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="py-24">
        <Card className="border-0 bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-[600px] mx-auto">
              Join thousands of candidates who have improved their interview skills with our comprehensive preparation platform.
            </p>
            {!isAuthenticated && (
              <Button 
                onClick={() => loginWithRedirect()} 
                size="lg" 
                variant="secondary"
                className="text-lg px-8"
              >
                Start Preparing Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
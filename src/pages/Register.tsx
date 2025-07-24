import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    // Auto-redirect to Auth0 signup
    const timer = setTimeout(() => {
      loginWithRedirect({ 
        authorizationParams: { 
          screen_hint: 'signup' 
        } 
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [loginWithRedirect]);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Join EvalPro</CardTitle>
          <CardDescription>
            Create your account to start your preparation journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => loginWithRedirect({ 
              authorizationParams: { 
                screen_hint: 'signup' 
              } 
            })} 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Redirecting you to secure registration...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
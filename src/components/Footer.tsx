import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">EvalPro</h3>
              <p className="text-sm text-muted-foreground">
                Professional candidate evaluation platform for modern recruitment.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Platform</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/prepare" className="text-sm text-muted-foreground hover:text-primary">
                  Prepare
                </Link>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/results" className="text-sm text-muted-foreground hover:text-primary">
                  Results
                </Link>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Company</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-primary">
                  Help
                </Link>
              </nav>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 EvalPro. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for better recruitment
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const LogoContainer: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Brain className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">EvalPro</span>
    </Link>
  );
};

export default LogoContainer;
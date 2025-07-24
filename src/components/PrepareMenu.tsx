import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, BookOpen, Code, MessageSquare, Users, Brain } from 'lucide-react';

const PrepareMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">
          Prepare
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/mock-test/aptitude" className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Aptitude Test
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mock-test/technical" className="w-full">
            <Code className="mr-2 h-4 w-4" />
            Technical Test
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/mock-interview/technical" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Technical Interview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mock-interview/hr" className="w-full">
            <Users className="mr-2 h-4 w-4" />
            HR Interview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/prepare/complete" className="w-full">
            <Brain className="mr-2 h-4 w-4" />
            Complete Preparation
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PrepareMenu;
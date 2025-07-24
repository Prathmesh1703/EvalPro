import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  User, 
  BarChart3, 
  Settings, 
  HelpCircle,
  BookOpen,
  Brain,
  MessageSquare,
  FileText
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Results', href: '/results', icon: BarChart3 },
    { 
      name: 'Mock Tests', 
      icon: BookOpen,
      children: [
        { name: 'Aptitude Test', href: '/mock-test/aptitude' },
        { name: 'Technical Test', href: '/mock-test/technical' }
      ]
    },
    { 
      name: 'Mock Interviews', 
      icon: MessageSquare,
      children: [
        { name: 'Technical Interview', href: '/mock-interview/technical' },
        { name: 'HR Interview', href: '/mock-interview/hr' }
      ]
    },
    { name: 'Complete Preparation', href: '/prepare/complete', icon: Brain },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:pt-16">
      <div className="flex grow flex-col overflow-y-auto border-r bg-background px-6 pb-4">
        <nav className="flex flex-1 flex-col space-y-1 pt-6">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  <div className="ml-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className={cn(
                          "block rounded-md px-2 py-2 text-sm font-medium transition-colors",
                          isActive(child.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
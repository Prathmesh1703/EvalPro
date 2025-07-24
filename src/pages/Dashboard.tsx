import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Container from '@/components/Container';
import { 
  BarChart3, 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  Clock,
  ArrowRight,
  Target,
  TrendingUp
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth0();

  // Mock data - replace with real data
  const stats = {
    testsCompleted: 12,
    averageScore: 78,
    timeSpent: '24h 30m',
    achievements: 5
  };

  const recentActivities = [
    { name: 'Technical Assessment', score: 85, date: '2025-01-15' },
    { name: 'HR Interview Practice', score: 72, date: '2025-01-14' },
    { name: 'Aptitude Test', score: 91, date: '2025-01-13' }
  ];

  const quickActions = [
    {
      title: 'Start Assessment',
      description: 'Take a new aptitude or technical test',
      icon: BookOpen,
      href: '/mock-test/aptitude',
      color: 'bg-blue-500'
    },
    {
      title: 'Practice Interview',
      description: 'Simulate a real interview experience',
      icon: MessageSquare,
      href: '/mock-interview/technical',
      color: 'bg-green-500'
    },
    {
      title: 'Complete Preparation',
      description: 'Full preparation workflow',
      icon: Target,
      href: '/prepare/complete',
      color: 'bg-purple-500'
    },
    {
      title: 'View Results',
      description: 'Check your performance history',
      icon: BarChart3,
      href: '/results',
      color: 'bg-orange-500'
    }
  ];

  return (
    <Container className="py-8 lg:ml-64">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-2">
            Continue your preparation journey and track your progress
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.timeSpent}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.achievements}</div>
              <p className="text-xs text-muted-foreground">
                Badges earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={action.href}>
                      Start Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Recent Activities</h2>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your recent test results and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">{activity.score}%</p>
                    <Progress value={activity.score} className="w-24" />
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link to="/results">
                  View All Results
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Container from '@/components/Container';
import { User, Mail, Calendar, MapPin, Edit } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth0();

  const userStats = {
    testsCompleted: 15,
    interviewsPracticed: 8,
    averageScore: 82,
    joinDate: 'January 2025'
  };

  const skills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'System Design'
  ];

  const achievements = [
    { name: 'First Test Completed', description: 'Completed your first assessment', earned: true },
    { name: 'Perfect Score', description: 'Achieved 100% on any test', earned: true },
    { name: 'Interview Master', description: 'Completed 10 mock interviews', earned: false },
    { name: 'Consistent Learner', description: 'Practiced for 7 consecutive days', earned: true },
  ];

  return (
    <div className="w-full lg:ml-64">
      <Container className="py-6 lg:py-8">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.picture} alt={user?.name} />
            <AvatarFallback className="text-2xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 w-full sm:w-auto">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{user?.name}</h1>
              <p className="text-muted-foreground flex items-center mt-1 text-sm lg:text-base">
                <Mail className="h-4 w-4 mr-2" />
                {user?.email}
              </p>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.testsCompleted}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Interviews Practiced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.interviewsPracticed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.averageScore}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{userStats.joinDate}</div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Technologies</CardTitle>
            <CardDescription>Technologies you've been assessed on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your learning milestones and accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.earned 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${!achievement.earned ? 'text-muted-foreground' : ''}`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Badge variant="default">Earned</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-muted-foreground">{user?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email Verified</label>
                <p className="text-muted-foreground">
                  {user?.email_verified ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <p className="text-muted-foreground">
                  {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </Container>
    </div>
  );
};

export default Profile;
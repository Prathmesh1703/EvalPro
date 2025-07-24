import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Container from '@/components/Container';
import { BarChart3, TrendingUp, Calendar, Clock, Download, Eye } from 'lucide-react';

const Results: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock data - replace with real data
  const results = [
    {
      id: 1,
      type: 'Aptitude Test',
      category: 'test',
      score: 85,
      maxScore: 100,
      duration: '45 min',
      date: '2025-01-15',
      status: 'completed',
      questions: 50,
      correct: 42
    },
    {
      id: 2,
      type: 'Technical Interview',
      category: 'interview',
      score: 78,
      maxScore: 100,
      duration: '60 min',
      date: '2025-01-14',
      status: 'completed',
      questions: 15,
      correct: 12
    },
    {
      id: 3,
      type: 'JavaScript Assessment',
      category: 'test',
      score: 92,
      maxScore: 100,
      duration: '30 min',
      date: '2025-01-13',
      status: 'completed',
      questions: 25,
      correct: 23
    },
    {
      id: 4,
      type: 'HR Interview',
      category: 'interview',
      score: 88,
      maxScore: 100,
      duration: '45 min',
      date: '2025-01-12',
      status: 'completed',
      questions: 12,
      correct: 11
    }
  ];

  const overallStats = {
    totalTests: results.length,
    averageScore: Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length),
    totalTimeSpent: '3h 15m',
    bestScore: Math.max(...results.map(r => r.score))
  };

  const filteredResults = selectedTab === 'all' 
    ? results 
    : results.filter(r => r.category === selectedTab);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 80) return 'secondary';
    if (score >= 70) return 'outline';
    return 'destructive';
  };

  return (
    <Container className="py-8 lg:ml-64">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Test Results</h1>
          <p className="text-muted-foreground mt-2">
            Track your performance and identify areas for improvement
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalTests}</div>
              <p className="text-xs text-muted-foreground">
                Completed assessments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Across all tests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalTimeSpent}</div>
              <p className="text-xs text-muted-foreground">
                Total practice time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.bestScore}%</div>
              <p className="text-xs text-muted-foreground">
                Personal record
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>Your detailed test results and performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="test">Tests Only</TabsTrigger>
                <TabsTrigger value="interview">Interviews Only</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="space-y-4">
                {filteredResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No results found for this category.</p>
                  </div>
                ) : (
                  filteredResults.map((result, index) => (
                    <Card key={result.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{result.type}</h3>
                            <Badge variant={getScoreBadgeVariant(result.score)}>
                              {result.score}%
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {result.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {result.duration}
                            </span>
                            <span>
                              {result.correct}/{result.questions} correct
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right space-y-2">
                            <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                              {result.score}%
                            </div>
                            <Progress value={result.score} className="w-24" />
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Areas where you excel and opportunities for improvement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">Strengths</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">JavaScript Programming</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Problem Solving</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-600">Areas to Improve</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Design</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Communication Skills</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Results;
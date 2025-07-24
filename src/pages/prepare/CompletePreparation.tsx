import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, BookOpen, Code, MessageSquare, Users, Trophy, ArrowRight, Play, RotateCcw } from 'lucide-react';
import Container from '@/components/Container';
import { Link } from 'react-router-dom';

const CompletePreparation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [preparationComplete, setPreparationComplete] = useState(false);

  const preparationSteps = [
    {
      id: 1,
      title: 'Aptitude Assessment',
      description: 'Test your logical reasoning, mathematical skills, and problem-solving abilities',
      icon: BookOpen,
      duration: '45 minutes',
      questions: 50,
      difficulty: 'Medium',
      route: '/mock-test/aptitude',
      color: 'bg-blue-500',
      skills: ['Logical Reasoning', 'Mathematics', 'Data Interpretation', 'Verbal Ability'],
      tips: [
        'Read questions carefully and manage your time',
        'Practice mental math for faster calculations',
        'Use elimination method for multiple choice questions'
      ]
    },
    {
      id: 2,
      title: 'Technical Assessment',
      description: 'Evaluate your programming skills and technical knowledge',
      icon: Code,
      duration: '60 minutes',
      questions: 25,
      difficulty: 'Hard',
      route: '/mock-test/technical',
      color: 'bg-green-500',
      skills: ['Programming', 'Data Structures', 'Algorithms', 'System Design'],
      tips: [
        'Write clean, well-commented code',
        'Test your solutions with edge cases',
        'Explain your thought process clearly'
      ]
    },
    {
      id: 3,
      title: 'Technical Interview',
      description: 'Practice system design and algorithmic problem-solving',
      icon: MessageSquare,
      duration: '45 minutes',
      questions: 8,
      difficulty: 'Hard',
      route: '/mock-interview/technical',
      color: 'bg-purple-500',
      skills: ['System Design', 'Problem Solving', 'Communication', 'Architecture'],
      tips: [
        'Think out loud during problem solving',
        'Start with high-level design before details',
        'Ask clarifying questions'
      ]
    },
    {
      id: 4,
      title: 'HR Interview',
      description: 'Demonstrate your soft skills and cultural fit',
      icon: Users,
      duration: '30 minutes',
      questions: 12,
      difficulty: 'Medium',
      route: '/mock-interview/hr',
      color: 'bg-orange-500',
      skills: ['Communication', 'Leadership', 'Teamwork', 'Cultural Fit'],
      tips: [
        'Use STAR method for behavioral questions',
        'Show enthusiasm and positive attitude',
        'Prepare specific examples from your experience'
      ]
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[stepIndex] = true;
    setCompletedSteps(newCompletedSteps);
    
    if (stepIndex === preparationSteps.length - 1) {
      setPreparationComplete(true);
    } else {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleRestartPreparation = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setPreparationComplete(false);
  };

  const calculateProgress = () => {
    return (completedSteps.filter(Boolean).length / preparationSteps.length) * 100;
  };

  if (preparationComplete) {
    return (
      <Container className="py-8 lg:ml-64">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">Congratulations!</CardTitle>
              <CardDescription className="text-lg">
                You've successfully completed the full preparation journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <Progress value={100} className="h-3 mb-4" />
                <p className="text-muted-foreground">
                  All 4 preparation steps completed successfully
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {preparationSteps.map((step, index) => (
                  <div key={step.id} className="text-center p-4 border rounded-lg bg-green-50 dark:bg-green-950/30">
                    <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                    <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Your Preparation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills Assessed</h4>
                    <div className="flex flex-wrap gap-1">
                      {Array.from(new Set(preparationSteps.flatMap(step => step.skills))).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Total Assessment Time</h4>
                    <p className="text-2xl font-bold text-primary">
                      {preparationSteps.reduce((total, step) => {
                        const minutes = parseInt(step.duration.split(' ')[0]);
                        return total + minutes;
                      }, 0)} minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">
                  🎯 What's Next?
                </h3>
                <ul className="text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• Review your detailed performance reports in the Results section</li>
                  <li>• Identify areas for improvement based on your scores</li>
                  <li>• Practice specific skills that need more attention</li>
                  <li>• Schedule real interviews with confidence!</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/results">
                    View Detailed Results
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleRestartPreparation} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 lg:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Complete Preparation Journey</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Follow our comprehensive 4-step preparation process to ace your interviews
          </p>
          <div className="max-w-2xl mx-auto">
            <Progress value={calculateProgress()} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {completedSteps.filter(Boolean).length} of {preparationSteps.length} steps completed
            </p>
          </div>
        </div>

        {/* Steps Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {preparationSteps.map((step, index) => {
            const isCompleted = completedSteps[index];
            const isCurrent = currentStep === index;
            const isLocked = index > currentStep && !isCompleted;

            return (
              <Card key={step.id} className={`relative ${
                isCurrent ? 'ring-2 ring-primary' : ''
              } ${isLocked ? 'opacity-60' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mx-auto mb-3 relative`}>
                    <step.icon className="h-6 w-6 text-white" />
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{step.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant={step.difficulty === 'Hard' ? 'destructive' : 'default'} className="mb-2">
                    {step.difficulty}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    {step.questions} questions
                  </p>
                  {isCompleted ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Completed ✓
                    </Badge>
                  ) : isCurrent ? (
                    <Badge variant="default">
                      Current Step
                    </Badge>
                  ) : isLocked ? (
                    <Badge variant="secondary">
                      Locked
                    </Badge>
                  ) : null}
                </CardContent>
              </Card>
            )}
          )}
        </div>

        {/* Current Step Detail */}
        {!preparationComplete && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${preparationSteps[currentStep].color} rounded-lg flex items-center justify-center`}>
                      {React.createElement(preparationSteps[currentStep].icon, {
                        className: "h-5 w-5 text-white"
                      })}
                    </div>
                    <span>Step {currentStep + 1}: {preparationSteps[currentStep].title}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {preparationSteps[currentStep].description}
                  </CardDescription>
                </div>
                <Badge variant={preparationSteps[currentStep].difficulty === 'Hard' ? 'destructive' : 'default'}>
                  {preparationSteps[currentStep].difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Skills You'll Practice</h4>
                  <div className="flex flex-wrap gap-2">
                    {preparationSteps[currentStep].skills.map(skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Assessment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{preparationSteps[currentStep].duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-medium">{preparationSteps[currentStep].questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className="font-medium">{preparationSteps[currentStep].difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                  💡 Tips for Success
                </h4>
                <ul className="text-amber-700 dark:text-amber-300 space-y-1">
                  {preparationSteps[currentStep].tips.map((tip, index) => (
                    <li key={index} className="text-sm">• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link to={preparationSteps[currentStep].route}>
                    <Play className="h-5 w-5 mr-2" />
                    Start {preparationSteps[currentStep].title}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Preparation Roadmap</CardTitle>
            <CardDescription>
              Your journey through our comprehensive assessment process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {preparationSteps.map((step, index) => {
                const isCompleted = completedSteps[index];
                const isCurrent = currentStep === index;
                
                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{step.duration}</p>
                      <p className="text-xs text-muted-foreground">{step.questions} questions</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default CompletePreparation;
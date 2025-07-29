import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Container from '@/components/Container';
import { Clock, CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const AptitudeTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false);

  // Mock questions - replace with real data
  const questions = [
    {
      id: 1,
      question: "If a car travels 120 miles in 2 hours, what is its average speed?",
      options: ["40 mph", "50 mph", "60 mph", "70 mph"],
      correctAnswer: 2
    },
    {
      id: 2,
      question: "Which number comes next in the sequence: 2, 4, 8, 16, ?",
      options: ["24", "28", "32", "36"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "If all roses are flowers and some flowers are red, which statement is necessarily true?",
      options: [
        "All roses are red",
        "Some roses are red", 
        "No roses are red",
        "All flowers are roses"
      ],
      correctAnswer: 1
    }
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
    // Calculate score and save results
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeRemaining(45 * 60);
    setTestCompleted(false);
  };

  if (testCompleted) {
    const score = calculateScore();
    return (
      <Container className="py-8 lg:ml-64">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Test Completed!</CardTitle>
              <CardDescription>Great job on completing the aptitude test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
                <p className="text-muted-foreground">Your Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{answers.filter((_, i) => parseInt(answers[i]) === questions[i].correctAnswer).length}</div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{questions.length - answers.filter((_, i) => parseInt(answers[i]) === questions[i].correctAnswer).length}</div>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Performance Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Logical Reasoning</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathematical Skills</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={restartTest} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Test
                </Button>
                <Button className="flex-1">
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full lg:ml-64">
      <Container className="py-6 lg:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Test Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="text-foreground">Aptitude Test</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length}
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  timeRemaining > 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {timeRemaining > 300 ? 'Good Time' : 'Running Low'}
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion] || ""} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                      index === currentQuestion
                        ? 'bg-primary text-primary-foreground'
                        : answers[index]
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-muted text-muted-foreground border'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="min-w-[100px]"
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium">Test Instructions:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Select the best answer for each question</li>
                  <li>You can navigate between questions using the question numbers</li>
                  <li>Make sure to submit before time runs out</li>
                  <li>Once submitted, you cannot change your answers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </Container>
    </div>
  );
};

export default AptitudeTest;
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Container from '@/components/Container';
import { Clock, Code, CheckCircle, ArrowRight, Play, RotateCcw } from 'lucide-react';

const TechnicalTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [testCompleted, setTestCompleted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  // Mock questions with different types
  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      category: 'JavaScript',
      difficulty: 'Medium',
      question: "What will be the output of the following JavaScript code?",
      code: `console.log(typeof null);
console.log(typeof undefined);
console.log(typeof []);`,
      options: [
        "null, undefined, array",
        "object, undefined, object", 
        "null, undefined, object",
        "object, object, array"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'coding',
      category: 'Algorithms',
      difficulty: 'Hard',
      question: "Write a function to find the longest palindromic substring in a given string.",
      description: "Implement a function that takes a string as input and returns the longest palindromic substring. If there are multiple palindromes of the same length, return any one of them.",
      constraints: [
        "String length: 1 ≤ n ≤ 1000",
        "String contains only lowercase English letters",
        "Time complexity should be O(n²) or better"
      ],
      testCases: [
        { input: "babad", output: "bab" },
        { input: "cbbd", output: "bb" },
        { input: "racecar", output: "racecar" }
      ]
    },
    {
      id: 3,
      type: 'multiple-choice',
      category: 'React',
      difficulty: 'Medium',
      question: "Which of the following is the correct way to handle state updates in React?",
      options: [
        "Directly mutate the state object",
        "Use setState() or useState hook",
        "Modify state in render method",
        "Update state in componentDidMount only"
      ],
      correctAnswer: 1
    }
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: any) => {
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
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question.type === 'multiple-choice' && parseInt(answer) === question.correctAnswer) {
        correct++;
      }
      // Coding questions would need manual or automated evaluation
    });
    const mcqQuestions = questions.filter(q => q.type === 'multiple-choice').length;
    return Math.round((correct / mcqQuestions) * 100);
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
              <CardTitle className="text-2xl">Technical Test Completed!</CardTitle>
              <CardDescription>Your solutions have been submitted for evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
                <p className="text-muted-foreground">Multiple Choice Score</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Coding questions are being evaluated and will be reflected in your final score
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{questions.length}</div>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">{Math.floor((60 * 60 - timeRemaining) / 60)}</div>
                  <p className="text-xs text-muted-foreground">Minutes Used</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-bold">
                    {questions.filter(q => q.difficulty === 'Hard').length}
                  </div>
                  <p className="text-xs text-muted-foreground">Hard Questions</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Technology Areas Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(questions.map(q => q.category))).map(category => (
                    <Badge key={category} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your coding solutions are being reviewed by our system</li>
                  <li>• Detailed feedback will be available within 24 hours</li>
                  <li>• Check the Results page for your complete evaluation</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Take Another Test
                </Button>
                <Button className="flex-1">
                  View All Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Container className="py-8 lg:ml-64">
      <div className="max-w-4xl mx-auto">
        {/* Test Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Technical Assessment</span>
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length} • {currentQ.category}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={currentQ.difficulty === 'Easy' ? 'secondary' : currentQ.difficulty === 'Medium' ? 'default' : 'destructive'}>
                  {currentQ.difficulty}
                </Badge>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
            {currentQ.description && (
              <CardDescription className="text-base">{currentQ.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQ.type === 'multiple-choice' ? (
              <div className="space-y-4">
                {currentQ.code && (
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{currentQ.code}</pre>
                  </div>
                )}
                <RadioGroup 
                  value={answers[currentQuestion] || ""} 
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Coding Question */}
                {currentQ.constraints && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Constraints:</h4>
                    <ul className="text-sm space-y-1">
                      {currentQ.constraints.map((constraint, index) => (
                        <li key={index}>• {constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={selectedLanguage} className="space-y-4">
                    <div className="relative">
                      <Textarea
                        placeholder={`Write your ${selectedLanguage} solution here...`}
                        className="font-mono text-sm min-h-[300px]"
                        value={answers[currentQuestion] || ""}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                      />
                      <Button size="sm" className="absolute top-2 right-2">
                        <Play className="h-4 w-4 mr-1" />
                        Run Code
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {currentQ.testCases && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Test Cases:</h4>
                    <div className="space-y-2">
                      {currentQ.testCases.map((testCase, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Input:</span> {JSON.stringify(testCase.input)}
                          </div>
                          <div>
                            <span className="font-medium">Expected Output:</span> {JSON.stringify(testCase.output)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
                {questions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg text-xs font-medium transition-colors flex items-center justify-center ${
                      index === currentQuestion
                        ? 'bg-primary text-primary-foreground'
                        : answers[index]
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-muted text-muted-foreground border'
                    }`}
                  >
                    {index + 1}
                    {q.type === 'coding' && <Code className="h-3 w-3 ml-1" />}
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
      </div>
    </Container>
  );
};

export default TechnicalTest;
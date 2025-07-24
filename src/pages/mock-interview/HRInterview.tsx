import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Container from '@/components/Container';
import { Mic, MicOff, Video, VideoOff, Clock, Users, CheckCircle, ArrowRight, Heart } from 'lucide-react';

const HRInterview: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [responses, setResponses] = useState<string[]>([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const questions = [
    {
      id: 1,
      category: 'Introduction',
      type: 'behavioral',
      question: "Tell me about yourself and why you're interested in this position.",
      timeLimit: 3,
      tips: [
        "Keep it concise and relevant to the role",
        "Focus on professional experience and achievements",
        "Connect your background to the job requirements",
        "End with why you're excited about this opportunity"
      ]
    },
    {
      id: 2,
      category: 'Experience',
      type: 'behavioral',
      question: "Describe a challenging project you worked on and how you overcame the obstacles.",
      timeLimit: 4,
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Be specific about your role and contributions",
        "Focus on problem-solving and leadership skills",
        "Quantify the results if possible"
      ]
    },
    {
      id: 3,
      category: 'Teamwork',
      type: 'behavioral',
      question: "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
      timeLimit: 3,
      tips: [
        "Show emotional intelligence and professionalism",
        "Focus on conflict resolution skills",
        "Demonstrate empathy and understanding",
        "Highlight positive outcomes"
      ]
    },
    {
      id: 4,
      category: 'Goals',
      type: 'motivational',
      question: "Where do you see yourself in 5 years, and how does this role fit into your career goals?",
      timeLimit: 3,
      tips: [
        "Show ambition while being realistic",
        "Align your goals with the company's growth",
        "Demonstrate long-term thinking",
        "Show commitment to professional development"
      ]
    },
    {
      id: 5,
      category: 'Company',
      type: 'motivational',
      question: "Why do you want to work for our company specifically?",
      timeLimit: 2,
      tips: [
        "Research the company beforehand",
        "Mention specific values or initiatives",
        "Connect with company culture",
        "Show genuine interest and enthusiasm"
      ]
    }
  ];

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = () => {
    setInterviewCompleted(true);
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioEnabled;
      }
    }
  };

  if (interviewCompleted) {
    return (
      <Container className="py-8 lg:ml-64">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">HR Interview Completed!</CardTitle>
              <CardDescription>
                Your responses have been recorded and will be evaluated for communication skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{questions.length}</div>
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{Math.floor((30 * 60 - timeRemaining) / 60)}</div>
                  <p className="text-sm text-muted-foreground">Minutes Used</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Interview Categories Covered</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from(new Set(questions.map(q => q.category))).map(category => (
                    <div key={category} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Question Summary</h3>
                {questions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{q.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {q.question.substring(0, 50)}...
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={q.type === 'behavioral' ? 'default' : 'secondary'}>
                        {q.type}
                      </Badge>
                      <Badge variant="outline">
                        {responses[index] ? 'Answered' : 'Skipped'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">
                  Evaluation Criteria
                </h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Communication clarity and articulation</li>
                  <li>• Professionalism and body language</li>
                  <li>• Alignment with company values</li>
                  <li>• Problem-solving approach in behavioral scenarios</li>
                  <li>• Enthusiasm and cultural fit</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What's Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your responses will be analyzed for communication effectiveness</li>
                  <li>• Behavioral answers will be evaluated using proven frameworks</li>
                  <li>• Detailed feedback will be available within 24 hours</li>
                  <li>• You'll receive tips for improving interview performance</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Practice More Questions
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
      <div className="max-w-5xl mx-auto">
        {/* Interview Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>HR Interview</span>
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length} • {currentQ.category}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={currentQ.type === 'behavioral' ? 'default' : 'secondary'}>
                  {currentQ.type}
                </Badge>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                  isRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {isRecording ? (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>Recording</span>
                    </>
                  ) : (
                    <span>Not Recording</span>
                  )}
                </div>
              </div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} className="mt-4" />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Response</CardTitle>
                <CardDescription>
                  Present yourself professionally and answer confidently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: videoEnabled ? 'block' : 'none' }}
                  />
                  {!videoEnabled && (
                    <div className="flex items-center justify-center h-full">
                      <VideoOff className="h-12 w-12 text-white/50" />
                    </div>
                  )}
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <Button
                      size="sm"
                      variant={audioEnabled ? "default" : "destructive"}
                      onClick={toggleAudio}
                    >
                      {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={videoEnabled ? "default" : "destructive"}
                      onClick={toggleVideo}
                    >
                      {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={toggleRecording}
                    >
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Time */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatTime(currentQ.timeLimit * 60)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended response time
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Interview Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950/30">
              <CardHeader>
                <CardTitle className="text-base text-blue-800 dark:text-blue-200">
                  💡 Interview Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• Maintain good eye contact with the camera</li>
                  <li>• Speak clearly and at a moderate pace</li>
                  <li>• Use specific examples from your experience</li>
                  <li>• Show enthusiasm and positive body language</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Question Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{currentQ.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-amber-800 dark:text-amber-200">
                    Key Points to Address:
                  </h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    {currentQ.tips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Preparation Notes (Optional)</label>
                  <Textarea
                    placeholder="Write down key points you want to mention in your response..."
                    className="min-h-[150px]"
                    value={responses[currentQuestion] || ""}
                    onChange={(e) => handleResponseChange(e.target.value)}
                  />
                </div>

                {currentQ.type === 'behavioral' && (
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">
                      STAR Method Reminder:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-green-700 dark:text-green-300">
                      <div><strong>S</strong>ituation - Set the context</div>
                      <div><strong>T</strong>ask - Describe your responsibility</div>
                      <div><strong>A</strong>ction - Explain what you did</div>
                      <div><strong>R</strong>esult - Share the outcome</div>
                    </div>
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
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous Question
                  </Button>
                  
                  <div className="flex space-x-2">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                          index === currentQuestion
                            ? 'bg-primary text-primary-foreground'
                            : responses[index] || index < currentQuestion
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-muted text-muted-foreground border'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <Button onClick={handleNext} className="min-w-[130px]">
                    {currentQuestion === questions.length - 1 ? 'Complete Interview' : 'Next Question'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HRInterview;
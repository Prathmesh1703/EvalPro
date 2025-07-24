import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Container from '@/components/Container';
import { Mic, MicOff, Video, VideoOff, Clock, User, CheckCircle, ArrowRight } from 'lucide-react';

const TechnicalInterview: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);
  const [responses, setResponses] = useState<string[]>([]);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const questions = [
    {
      id: 1,
      category: 'System Design',
      difficulty: 'Hard',
      question: "Design a URL shortening service like bit.ly. What are the key components and how would you handle scaling?",
      timeLimit: 8,
      hints: [
        "Consider the database schema for storing URLs",
        "Think about how to generate short URLs",
        "Consider caching strategies for popular URLs",
        "How would you handle millions of requests per day?"
      ]
    },
    {
      id: 2,
      category: 'Algorithms',
      difficulty: 'Medium',
      question: "Explain how you would implement a LRU (Least Recently Used) cache. Walk me through your approach and discuss the time complexity.",
      timeLimit: 6,
      hints: [
        "Consider using a combination of data structures",
        "Think about O(1) access time requirements",
        "How would you track the usage order?",
        "What happens when the cache is full?"
      ]
    },
    {
      id: 3,
      category: 'JavaScript',
      difficulty: 'Medium',
      question: "Explain event delegation in JavaScript and provide a practical example where you would use it.",
      timeLimit: 5,
      hints: [
        "Think about event bubbling and capturing",
        "Consider performance benefits",
        "What about dynamically added elements?",
        "Provide a code example if possible"
      ]
    }
  ];

  useEffect(() => {
    // Initialize webcam
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

    // Cleanup
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
              <CardTitle className="text-2xl">Technical Interview Completed!</CardTitle>
              <CardDescription>
                Your responses have been recorded and will be evaluated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{questions.length}</div>
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{Math.floor((45 * 60 - timeRemaining) / 60)}</div>
                  <p className="text-sm text-muted-foreground">Minutes Used</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Interview Summary</h3>
                <div className="space-y-3">
                  {questions.map((q, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{q.category}</p>
                        <p className="text-sm text-muted-foreground">Question {index + 1}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={q.difficulty === 'Hard' ? 'destructive' : 'default'}>
                          {q.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {responses[index] ? 'Answered' : 'Skipped'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What Happens Next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your video responses will be analyzed for technical accuracy</li>
                  <li>• Communication skills will be evaluated based on clarity and structure</li>
                  <li>• Detailed feedback will be available within 24-48 hours</li>
                  <li>• You'll receive recommendations for improvement areas</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Schedule Another Interview
                </Button>
                <Button className="flex-1">
                  View Interview History
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
                  <User className="h-5 w-5" />
                  <span>Technical Interview</span>
                </CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {questions.length} • {currentQ.category}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={currentQ.difficulty === 'Hard' ? 'destructive' : 'default'}>
                  {currentQ.difficulty}
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
                  Record your response to the interview question
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

            {/* Timer for current question */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatTime(currentQ.timeLimit * 60)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended time for this question
                  </p>
                </div>
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
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Think about these points:</h4>
                  <ul className="text-sm space-y-1">
                    {currentQ.hints.map((hint, index) => (
                      <li key={index}>• {hint}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Written Notes (Optional)</label>
                  <Textarea
                    placeholder="Jot down your thoughts or key points here..."
                    className="min-h-[150px]"
                    value={responses[currentQuestion] || ""}
                    onChange={(e) => handleResponseChange(e.target.value)}
                  />
                </div>
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

export default TechnicalInterview;
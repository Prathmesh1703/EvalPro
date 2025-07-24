
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import MainLayout from '@/layouts/MainLayout';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Results from '@/pages/Results';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

// Mock Test Pages
import AptitudeTest from '@/pages/mock-test/AptitudeTest';
import TechnicalTest from '@/pages/mock-test/TechnicalTest';

// Mock Interview Pages
import TechnicalInterview from '@/pages/mock-interview/TechnicalInterview';
import HRInterview from '@/pages/mock-interview/HRInterview';

// Prepare Pages
import CompletePreparation from '@/pages/prepare/CompletePreparation';

// UI Components
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedLayout />}>
              <Route element={<MainLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="results" element={<Results />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
              </Route>
              
              {/* Mock Tests */}
              <Route path="mock-test/aptitude" element={<AptitudeTest />} />
              <Route path="mock-test/technical" element={<TechnicalTest />} />
              
              {/* Mock Interviews */}
              <Route path="mock-interview/technical" element={<TechnicalInterview />} />
              <Route path="mock-interview/hr" element={<HRInterview />} />
              
              {/* Prepare */}
              <Route path="prepare/complete" element={<CompletePreparation />} />
            </Route>
          </Routes>
          
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
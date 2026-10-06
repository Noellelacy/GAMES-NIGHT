import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Hero } from './components/Hero';
import { RsvpForm } from './components/RsvpForm';
import { Confirmation } from './components/Confirmation';
import { HostDashboard } from './components/HostDashboard';
import { useRsvpData } from './hooks/useRsvpData';
import { RsvpSubmission } from './types';
import { Settings } from 'lucide-react';
import { submitToWebhook } from './utils/storage';

function App() {
  const { submissions, stats, addSubmission, remainingParking } = useRsvpData();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<RsvpSubmission | null>(null);
  const [showHostDashboard, setShowHostDashboard] = useState(false);

  const handleSubmit = async (submission: RsvpSubmission) => {
    // Save to localStorage
    addSubmission(submission);

    // Try to send to webhook if configured
    await submitToWebhook(submission);

    // Trigger confetti celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2a5f', '#8b5cf6', '#06b6d4', '#ffffff'],
    });

    // Dual cannon burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff2a5f', '#8b5cf6'],
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#06b6d4', '#ffffff'],
      });
    }, 200);

    setLastSubmission(submission);
    setShowConfirmation(true);
  };

  const handleReset = () => {
    setShowConfirmation(false);
    setLastSubmission(null);
  };

  return (
    <div className="min-h-screen">
      {/* Host Toggle Button */}
      <button
        onClick={() => setShowHostDashboard(true)}
        className="fixed top-4 right-4 z-40 p-2 rounded-lg backdrop-blur-md bg-gray-800/60 border border-gray-700/50 hover:bg-gray-700 transition-colors"
        aria-label="Host Dashboard"
      >
        <Settings className="w-5 h-5 text-gray-400" />
      </button>

      {/* Hero Section */}
      <Hero stats={stats} />

      {/* Main Content */}
      {showConfirmation && lastSubmission ? (
        <Confirmation submission={lastSubmission} onReset={handleReset} />
      ) : (
        <RsvpForm onSubmit={handleSubmit} remainingParking={remainingParking} />
      )}

      {/* Host Dashboard Modal */}
      {showHostDashboard && (
        <HostDashboard
          submissions={submissions}
          onClose={() => setShowHostDashboard(false)}
        />
      )}
    </div>
  );
}

export default App;

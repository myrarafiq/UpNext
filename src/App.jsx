import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <MainApp />
      </div>
    </AppProvider>
  );
}

function MainApp() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboarded = localStorage.getItem('upnext_onboarded');
    if (onboarded) {
      setIsOnboarded(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('upnext_onboarded', 'true');
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard />;
}

export default App;


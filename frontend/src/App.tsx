import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/login-page';
import { MainLayout } from './components/main-layout';
import { Dashboard } from './components/dashboard';
import { Forum } from './components/forum';
import { Chat } from './components/chat';
import { AcademicCalendar } from './components/calendar';
import { DocumentRepository } from './components/document-repository';
import { Analytics } from './components/analytics';
import { Toaster } from './components/ui/sonner';

interface User {
  role: string;
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Apply dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (role: string, credentials: { email: string; password: string }) => {
    // Mock authentication - in real app, this would validate against backend
    const roleNames = {
      student: 'Alex Johnson',
      faculty: 'Dr. Sarah Johnson', 
      admin: 'System Administrator',
      ta: 'Teaching Assistant'
    };

    setUser({
      role,
      name: roleNames[role as keyof typeof roleNames] || 'User',
      email: credentials.email
    });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    if (!user) return null;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={user.role} />;
      case 'forum':
        return <Forum userRole={user.role} />;
      case 'chat':
        return <Chat userRole={user.role} />;
      case 'calendar':
        return <AcademicCalendar userRole={user.role} />;
      case 'documents':
        return <DocumentRepository userRole={user.role} />;
      case 'analytics':
        return <Analytics userRole={user.role} />;
      case 'courses':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      case 'assignments':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      case 'students':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      case 'users':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      case 'settings':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      case 'grades':
        return <Dashboard userRole={user.role} />; // Placeholder - could be separate component
      default:
        return <Dashboard userRole={user.role} />;
    }
  };

  if (!user) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <MainLayout
        userRole={user.role}
        userName={user.name}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      >
        {renderCurrentView()}
      </MainLayout>
      <Toaster />
    </>
  );
}
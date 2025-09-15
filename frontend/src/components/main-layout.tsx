import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Moon, 
  Sun,
  LogOut,
  User,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
  Video,
  HelpCircle,
  Zap
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  userRole: string;
  userName: string;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export function MainLayout({ children, userRole, userName, onLogout, currentView, onViewChange }: MainLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications] = useState(5);

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'forum', label: 'Discussion Forum', icon: MessageCircle },
      { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
      { id: 'documents', label: 'Document Repository', icon: FolderOpen },
      { id: 'chat', label: 'Real-time Chat', icon: MessageCircle },
    ];

    const roleSpecificItems = {
      faculty: [
        { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
        { id: 'assignments', label: 'Assignments & Grading', icon: FileText },
        { id: 'students', label: 'Student Management', icon: Users },
      ],
      admin: [
        { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ],
      ta: [
        { id: 'assignments', label: 'Assigned Tasks', icon: FileText },
        { id: 'students', label: 'Student Support', icon: Users },
      ],
      student: [
        { id: 'courses', label: 'My Courses', icon: BookOpen },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'grades', label: 'Grades & Progress', icon: BarChart3 },
      ]
    };

    return [...baseItems, ...(roleSpecificItems[userRole as keyof typeof roleSpecificItems] || [])];
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getRoleColor = () => {
    const colors = {
      student: 'bg-blue-600',
      faculty: 'bg-emerald-600', 
      admin: 'bg-amber-600',
      ta: 'bg-purple-600'
    };
    return colors[userRole as keyof typeof colors] || 'bg-gray-600';
  };

  const getRoleLabel = () => {
    const labels = {
      student: 'Student',
      faculty: 'Faculty',
      admin: 'Administrator', 
      ta: 'Teaching Assistant'
    };
    return labels[userRole as keyof typeof labels] || 'User';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-border bg-sidebar">
          <SidebarHeader className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-xl">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sidebar-foreground">Academic Portal</h2>
                <p className="text-xs text-sidebar-foreground/60">Faculty-Student Hub</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.id)}
                    isActive={currentView === item.id}
                    className="w-full justify-start space-x-3 p-3 rounded-xl"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {/* AI Assistant Widget */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-sidebar-foreground">AI Assistant</span>
              </div>
              <p className="text-xs text-sidebar-foreground/60 mb-3">Get instant help with FAQs, deadlines, and navigation.</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Ask AI Assistant
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="hidden md:flex items-center space-x-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, documents, people..."
                  className="px-3 py-2 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-lg"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative rounded-lg">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback className={getRoleColor()}>
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-foreground">{userName}</p>
                      <p className="text-xs text-muted-foreground">{getRoleLabel()}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
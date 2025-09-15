import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap, Users, Shield, UserCheck, Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: string, credentials: { email: string; password: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-400' },
    { value: 'faculty', label: 'Faculty', icon: Users, color: 'text-emerald-400' },
    { value: 'admin', label: 'Administrator', icon: Shield, color: 'text-amber-400' },
    { value: 'ta', label: 'Teaching Assistant', icon: UserCheck, color: 'text-purple-400' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && email && password) {
      onLogin(selectedRole, { email, password });
    }
  };

  const handleDemoLogin = (role: string) => {
    const demoCredentials = {
      email: `demo.${role}@university.edu`,
      password: 'demo123'
    };
    onLogin(role, demoCredentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Faculty-Student Portal</h1>
            <p className="text-gray-300 mt-2">Connect, Learn, Collaborate</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your academic portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-white">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value} className="text-white">
                        <div className="flex items-center space-x-2">
                          <role.icon className={`w-4 h-4 ${role.color}`} />
                          <span>{role.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                disabled={!selectedRole || !email || !password}
              >
                Sign In
              </Button>
            </form>

            {/* SSO Options */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              University SSO
            </Button>

            {/* Demo Access */}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 text-center">Quick Demo Access:</p>
              <div className="grid grid-cols-2 gap-2">
                {roles.slice(0, 4).map((role) => (
                  <Button
                    key={role.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDemoLogin(role.value)}
                    className="text-xs text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    <role.icon className={`w-3 h-3 mr-1 ${role.color}`} />
                    {role.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400">
          <p>University Academic Portal • Secure & Private</p>
          <p className="mt-1">Need help? Contact IT Support</p>
        </div>
      </div>
    </div>
  );
}
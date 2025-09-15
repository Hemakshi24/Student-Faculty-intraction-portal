import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  BookOpen,
  Calendar,
  MessageSquare,
  FileText,
  Users,
  TrendingUp,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  Star,
  Target,
  Activity,
  BarChart3
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

export function Dashboard({ userRole }: DashboardProps) {
  const renderStudentDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6 rounded-2xl border border-blue-600/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex!</h1>
            <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">4.2</div>
              <div className="text-xs text-muted-foreground">GPA</div>
            </div>
            <div className="p-3 bg-blue-600 rounded-full">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <p className="text-xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm text-muted-foreground">Due This Week</p>
                <p className="text-xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
            <CardDescription>Don't miss these important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { course: 'Advanced Database Systems', task: 'Project Report', due: 'Tomorrow', urgent: true },
              { course: 'Machine Learning', task: 'Assignment 3', due: '3 days', urgent: false },
              { course: 'Software Engineering', task: 'Code Review', due: '5 days', urgent: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.task}</div>
                  <div className="text-xs text-muted-foreground">{item.course}</div>
                </div>
                <Badge variant={item.urgent ? "destructive" : "outline"}>
                  Due {item.due}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Join Study Group
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Office Hours
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Submit Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Access Course Materials
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your learning progress across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { course: 'Database Systems', progress: 85, grade: 'A-' },
              { course: 'Machine Learning', progress: 72, grade: 'B+' },
              { course: 'Software Engineering', progress: 91, grade: 'A' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{item.course}</h4>
                  <Badge variant="outline">{item.grade}</Badge>
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">{item.progress}% Complete</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFacultyDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600/10 to-blue-600/10 p-6 rounded-2xl border border-emerald-600/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning, Dr. Johnson!</h1>
            <p className="text-muted-foreground mt-1">Manage your courses and engage with students</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">156</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="p-3 bg-emerald-600 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">New Messages</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                <p className="text-xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <span>Recent Student Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { student: 'Sarah Chen', action: 'Submitted Assignment 4', course: 'Database Systems', time: '2 hours ago' },
              { student: 'Mike Rodriguez', action: 'Asked question in forum', course: 'Machine Learning', time: '4 hours ago' },
              { student: 'Emily Watson', action: 'Completed Module 3', course: 'Software Engineering', time: '6 hours ago' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{item.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.student}</div>
                  <div className="text-xs text-muted-foreground">{item.action} • {item.course}</div>
                </div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { course: 'Database Systems', students: 45, completion: 78 },
              { course: 'Machine Learning', students: 38, completion: 65 },
              { course: 'Data Structures', students: 52, completion: 82 },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">{item.course}</h4>
                  <span className="text-xs text-muted-foreground">{item.students} students</span>
                </div>
                <Progress value={item.completion} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">{item.completion}% avg completion</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-600/10 to-red-600/10 p-6 rounded-2xl border border-amber-600/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Overview</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage the academic portal</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">99.8%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="p-3 bg-amber-600 rounded-full">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-xl font-bold">124</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-xl font-bold">8,432</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Daily Active</p>
                <p className="text-xl font-bold">1,243</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTADashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-6 rounded-2xl border border-purple-600/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">TA Dashboard</h1>
            <p className="text-muted-foreground mt-1">Support students and assist faculty</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">15</div>
              <div className="text-xs text-muted-foreground">Assigned</div>
            </div>
            <div className="p-3 bg-purple-600 rounded-full">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">To Grade</p>
                <p className="text-xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Students Helped</p>
                <p className="text-xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-muted-foreground">Forum Posts</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const dashboardRenderers = {
    student: renderStudentDashboard,
    faculty: renderFacultyDashboard,
    admin: renderAdminDashboard,
    ta: renderTADashboard,
  };

  return dashboardRenderers[userRole as keyof typeof dashboardRenderers]?.() || <div>Dashboard not found</div>;
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Clock,
  Award,
  Target,
  Activity,
  Download,
  FileText,
  Calendar
} from 'lucide-react';

interface AnalyticsProps {
  userRole: string;
}

export function Analytics({ userRole }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Sample data for charts
  const engagementData = [
    { day: 'Mon', students: 42, faculty: 8, discussions: 15 },
    { day: 'Tue', students: 38, faculty: 12, discussions: 23 },
    { day: 'Wed', students: 51, faculty: 9, discussions: 18 },
    { day: 'Thu', students: 45, faculty: 11, discussions: 31 },
    { day: 'Fri', students: 39, faculty: 7, discussions: 12 },
    { day: 'Sat', students: 28, faculty: 4, discussions: 8 },
    { day: 'Sun', students: 22, faculty: 3, discussions: 6 }
  ];

  const submissionData = [
    { week: 'Week 1', onTime: 85, late: 12, missing: 3 },
    { week: 'Week 2', onTime: 78, late: 18, missing: 4 },
    { week: 'Week 3', onTime: 92, late: 6, missing: 2 },
    { week: 'Week 4', onTime: 88, late: 10, missing: 2 },
    { week: 'Week 5', onTime: 76, late: 20, missing: 4 },
    { week: 'Week 6', onTime: 91, late: 7, missing: 2 }
  ];

  const courseDistribution = [
    { name: 'Database Systems', value: 45, color: '#1E3A8A' },
    { name: 'Machine Learning', value: 38, color: '#10B981' },
    { name: 'Software Engineering', value: 52, color: '#F59E0B' },
    { name: 'Data Structures', value: 41, color: '#8B5CF6' }
  ];

  const performanceData = [
    { month: 'Jan', avgGrade: 78, participation: 65, submissions: 92 },
    { month: 'Feb', avgGrade: 82, participation: 71, submissions: 88 },
    { month: 'Mar', avgGrade: 79, participation: 68, submissions: 95 },
    { month: 'Apr', avgGrade: 85, participation: 74, submissions: 89 },
    { month: 'May', avgGrade: 83, participation: 76, submissions: 91 },
    { month: 'Jun', avgGrade: 87, participation: 79, submissions: 94 }
  ];

  const renderFacultyAnalytics = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">156</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12% this week</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Engagement</p>
                <p className="text-2xl font-bold">87%</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+5% from last week</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Forum Posts</p>
                <p className="text-2xl font-bold">234</p>
                <div className="flex items-center space-x-1 text-xs text-red-600">
                  <TrendingDown className="w-3 h-3" />
                  <span>-3% this week</span>
                </div>
              </div>
              <MessageSquare className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Grade</p>
                <p className="text-2xl font-bold">B+</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>Improved</span>
                </div>
              </div>
              <Award className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engagement">Student Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="submissions">Assignment Submissions</TabsTrigger>
          <TabsTrigger value="courses">Course Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Engagement Overview</CardTitle>
              <CardDescription>Student and faculty activity throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#1E3A8A" name="Students" />
                  <Bar dataKey="faculty" fill="#10B981" name="Faculty" />
                  <Bar dataKey="discussions" fill="#F59E0B" name="Discussions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track student performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgGrade" stroke="#1E3A8A" name="Average Grade" />
                  <Line type="monotone" dataKey="participation" stroke="#10B981" name="Participation %" />
                  <Line type="monotone" dataKey="submissions" stroke="#F59E0B" name="Submissions %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Submission Patterns</CardTitle>
              <CardDescription>Track submission timeliness across weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10B981" fill="#10B981" />
                  <Area type="monotone" dataKey="late" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                  <Area type="monotone" dataKey="missing" stackId="1" stroke="#EF4444" fill="#EF4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollment Distribution</CardTitle>
              <CardDescription>Student distribution across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderStudentAnalytics = () => (
    <div className="space-y-6">
      {/* Personal KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-2xl font-bold">3.8</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+0.2 this semester</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>Excellent</span>
                </div>
              </div>
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Study Hours</p>
                <p className="text-2xl font-bold">28h</p>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>This week</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Forum Posts</p>
                <p className="text-2xl font-bold">47</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <MessageSquare className="w-3 h-3" />
                  <span>Active participant</span>
                </div>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress in each enrolled course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { course: 'Database Systems', progress: 87, grade: 'A-' },
              { course: 'Machine Learning', progress: 72, grade: 'B+' },
              { course: 'Software Engineering', progress: 94, grade: 'A' },
              { course: 'Data Structures', progress: 68, grade: 'B' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.course}</span>
                  <Badge variant="outline">{item.grade}</Badge>
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.progress}% complete</span>
                  <span>Current grade: {item.grade}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Habits</CardTitle>
            <CardDescription>Your learning pattern this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData.slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="participation" stroke="#10B981" name="Participation" />
                <Line type="monotone" dataKey="submissions" stroke="#1E3A8A" name="Submissions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your academic milestones and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Perfect Attendance', description: '4 weeks straight', icon: Calendar, color: 'text-blue-400' },
              { title: 'Top Contributor', description: 'Most forum posts', icon: MessageSquare, color: 'text-emerald-400' },
              { title: 'Early Bird', description: 'All assignments on time', icon: Clock, color: 'text-amber-400' },
              { title: 'Study Master', description: '50+ hours this month', icon: BookOpen, color: 'text-purple-400' }
            ].map((achievement, idx) => (
              <div key={idx} className="text-center p-4 bg-muted rounded-lg">
                <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                <h4 className="font-medium text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminAnalytics = () => (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">2,847</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+5.2% this month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">99.8%</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <Activity className="w-3 h-3" />
                  <span>Excellent</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">1.2TB</p>
                <div className="flex items-center space-x-1 text-xs text-amber-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>72% capacity</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Active</p>
                <p className="text-2xl font-bold">1,243</p>
                <div className="flex items-center space-x-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+8% today</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Performance</CardTitle>
          <CardDescription>Platform usage and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="students" stackId="1" stroke="#1E3A8A" fill="#1E3A8A" fillOpacity={0.8} />
              <Area type="monotone" dataKey="faculty" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {userRole === 'faculty' ? 'Teaching Analytics' : 
             userRole === 'admin' ? 'System Analytics' : 'Learning Analytics'}
          </h1>
          <p className="text-muted-foreground">
            {userRole === 'faculty' ? 'Track student engagement and course performance' :
             userRole === 'admin' ? 'Monitor system health and user activity' :
             'Monitor your academic progress and achievements'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Role-specific content */}
      {userRole === 'faculty' && renderFacultyAnalytics()}
      {userRole === 'student' && renderStudentAnalytics()}
      {userRole === 'admin' && renderAdminAnalytics()}
      {userRole === 'ta' && renderFacultyAnalytics()} {/* TAs get similar view to faculty */}
    </div>
  );
}
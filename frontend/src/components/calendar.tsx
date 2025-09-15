import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  BookOpen,
  FileText,
  Video,
  Coffee
} from 'lucide-react';

interface CalendarProps {
  userRole: string;
}

export function AcademicCalendar({ userRole }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventDialog, setShowEventDialog] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Database Systems - Lecture 15',
      type: 'lecture',
      course: 'Database Systems',
      time: '09:00 AM - 10:30 AM',
      location: 'Room A-101',
      date: new Date(2024, 11, 20), // December 20, 2024
      color: 'bg-blue-500',
      participants: 45,
      hasConflict: false
    },
    {
      id: 2,
      title: 'ML Project Presentation',
      type: 'presentation',
      course: 'Machine Learning',
      time: '02:00 PM - 03:30 PM',
      location: 'Virtual Meeting',
      date: new Date(2024, 11, 20),
      color: 'bg-emerald-500',
      participants: 8,
      hasConflict: false
    },
    {
      id: 3,
      title: 'Assignment 4 Due',
      type: 'deadline',
      course: 'Software Engineering',
      time: '11:59 PM',
      location: 'Online Submission',
      date: new Date(2024, 11, 21),
      color: 'bg-red-500',
      participants: 0,
      hasConflict: false
    },
    {
      id: 4,
      title: 'Office Hours - Dr. Johnson',
      type: 'office-hours',
      course: 'Database Systems',
      time: '03:00 PM - 05:00 PM',
      location: 'Office B-205',
      date: new Date(2024, 11, 22),
      color: 'bg-purple-500',
      participants: 0,
      hasConflict: false
    },
    {
      id: 5,
      title: 'Study Group Meeting',
      type: 'study-group',
      course: 'Data Structures',
      time: '07:00 PM - 09:00 PM',
      location: 'Library Room 3',
      date: new Date(2024, 11, 22),
      color: 'bg-amber-500',
      participants: 6,
      hasConflict: true
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lecture': return BookOpen;
      case 'presentation': return Video;
      case 'deadline': return FileText;
      case 'office-hours': return Coffee;
      case 'study-group': return Users;
      default: return CalendarIcon;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'lecture': return 'Lecture';
      case 'presentation': return 'Presentation';
      case 'deadline': return 'Deadline';
      case 'office-hours': return 'Office Hours';
      case 'study-group': return 'Study Group';
      default: return 'Event';
    }
  };

  const todaysEvents = events.filter(event => {
    const today = new Date();
    return event.date.toDateString() === today.toDateString();
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return event.date > today && event.date <= nextWeek;
  }).slice(0, 5);

  const conflictingEvents = events.filter(event => event.hasConflict);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Academic Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and track important dates</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
          </div>
          <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add a new event to your academic calendar
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                        <SelectItem value="office-hours">Office Hours</SelectItem>
                        <SelectItem value="study-group">Study Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="event-course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="db">Database Systems</SelectItem>
                        <SelectItem value="ml">Machine Learning</SelectItem>
                        <SelectItem value="se">Software Engineering</SelectItem>
                        <SelectItem value="ds">Data Structures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="event-location">Location</Label>
                  <Input id="event-location" placeholder="Enter location" />
                </div>
                <div>
                  <Label htmlFor="event-description">Description (optional)</Label>
                  <Textarea id="event-description" placeholder="Add event details" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary">
                    Create Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Conflict Alerts */}
      {conflictingEvents.length > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-700 dark:text-amber-400">Schedule Conflicts Detected</h4>
                <p className="text-sm text-amber-600 dark:text-amber-300 mt-1">
                  You have {conflictingEvents.length} overlapping event{conflictingEvents.length !== 1 ? 's' : ''}. 
                  <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-300 ml-1">
                    Resolve conflicts
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Component */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
              
              {/* Events for selected date */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">
                  Events for {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <div className="space-y-2">
                  {events.filter(event => 
                    event.date.toDateString() === selectedDate.toDateString()
                  ).map((event) => {
                    const IconComponent = getEventIcon(event.type);
                    return (
                      <div key={event.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <div className={`p-2 ${event.color} rounded-lg`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs text-muted-foreground flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getEventTypeLabel(event.type)}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>
                {todaysEvents.length} event{todaysEvents.length !== 1 ? 's' : ''} today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => {
                  const IconComponent = getEventIcon(event.type);
                  return (
                    <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                      <div className={`p-1.5 ${event.color} rounded`}>
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs truncate">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No events scheduled for today</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Coming Up</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                    <div className={`p-1.5 ${event.color} rounded`}>
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs truncate">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} • {event.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Lectures</span>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Assignments Due</span>
                <Badge variant="outline" className="bg-red-500/10 text-red-600">3</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Office Hours</span>
                <Badge variant="outline">4</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Study Groups</span>
                <Badge variant="outline">2</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
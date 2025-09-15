import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  MessageCircle, 
  ThumbsUp,
  BookOpen,
  Users,
  Calendar,
  Pin,
  Star
} from 'lucide-react';

interface ForumProps {
  userRole: string;
}

export function Forum({ userRole }: ForumProps) {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'db', name: 'Database Systems' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'se', name: 'Software Engineering' },
    { id: 'ds', name: 'Data Structures' },
  ];

  const threads = [
    {
      id: 1,
      title: 'Understanding Normalization in Database Design',
      author: 'Sarah Chen',
      course: 'Database Systems',
      category: 'Question',
      replies: 8,
      upvotes: 12,
      lastActivity: '2 hours ago',
      isPinned: true,
      isResolved: false,
      tags: ['normalization', 'database-design', '3NF']
    },
    {
      id: 2,
      title: 'Best practices for feature selection in ML',
      author: 'Dr. Johnson',
      course: 'Machine Learning',
      category: 'Discussion',
      replies: 15,
      upvotes: 23,
      lastActivity: '4 hours ago',
      isPinned: false,
      isResolved: true,
      tags: ['feature-selection', 'preprocessing', 'best-practices']
    },
    {
      id: 3,
      title: 'Help with implementing binary search tree',
      author: 'Mike Rodriguez',
      course: 'Data Structures',
      category: 'Help',
      replies: 6,
      upvotes: 8,
      lastActivity: '6 hours ago',
      isPinned: false,
      isResolved: true,
      tags: ['BST', 'implementation', 'recursion']
    },
    {
      id: 4,
      title: 'Assignment 3 Clarifications',
      author: 'Emily Watson',
      course: 'Software Engineering',
      category: 'Assignment',
      replies: 12,
      upvotes: 18,
      lastActivity: '1 day ago',
      isPinned: false,
      isResolved: false,
      tags: ['assignment3', 'requirements', 'clarification']
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Question': 'bg-blue-600',
      'Discussion': 'bg-emerald-600',
      'Help': 'bg-amber-600',
      'Assignment': 'bg-purple-600',
      'Announcement': 'bg-red-600'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  const filteredThreads = threads.filter(thread => {
    const matchesCourse = selectedCourse === 'all' || thread.course.toLowerCase().includes(selectedCourse);
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discussion Forum</h1>
          <p className="text-muted-foreground">Connect, discuss, and learn together</p>
        </div>
        <Button onClick={() => setShowNewThread(true)} className="bg-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Thread
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search threads, authors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Course Filter */}
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Forum Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">247</div>
            <div className="text-sm text-muted-foreground">Total Threads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">1.2k</div>
            <div className="text-sm text-muted-foreground">Total Replies</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">42</div>
            <div className="text-sm text-muted-foreground">Today's Posts</div>
          </CardContent>
        </Card>
      </div>

      {/* Forum Threads */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <Card key={thread.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {thread.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  {/* Thread Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {thread.isPinned && <Pin className="w-4 h-4 text-amber-400" />}
                        <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                          {thread.title}
                        </h3>
                        {thread.isResolved && <Star className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>by {thread.author}</span>
                        <span>•</span>
                        <span>{thread.course}</span>
                        <span>•</span>
                        <span>{thread.lastActivity}</span>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(thread.category)}>
                      {thread.category}
                    </Badge>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {thread.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Thread Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{thread.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{thread.upvotes}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Thread →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Create New Thread</CardTitle>
              <CardDescription>
                Start a new discussion or ask a question
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.slice(1).map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="discussion">Discussion</SelectItem>
                      <SelectItem value="help">Help</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Thread Title</label>
                <Input placeholder="Enter a descriptive title..." />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea 
                  placeholder="Describe your question or topic in detail..."
                  className="min-h-32"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags (optional)</label>
                <Input placeholder="Enter tags separated by commas..." />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowNewThread(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary">
                  Create Thread
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
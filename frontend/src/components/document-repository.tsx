import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Upload, 
  Grid, 
  List, 
  FileText, 
  FileImage, 
  FileVideo, 
  File,
  Download,
  Eye,
  MoreVertical,
  Star,
  Clock,
  User,
  Calendar
} from 'lucide-react';

interface DocumentRepositoryProps {
  userRole: string;
}

export function DocumentRepository({ userRole }: DocumentRepositoryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'db', name: 'Database Systems' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'se', name: 'Software Engineering' },
    { id: 'ds', name: 'Data Structures' },
  ];

  const documents = [
    {
      id: 1,
      name: 'Database Normalization Lecture Slides',
      type: 'presentation',
      size: '2.4 MB',
      course: 'Database Systems',
      uploadedBy: 'Dr. Johnson',
      uploadDate: '2024-12-15',
      downloads: 42,
      isStarred: true,
      version: '1.2',
      tags: ['lecture', 'normalization', '3NF']
    },
    {
      id: 2,
      name: 'ML Assignment 3 - Instructions',
      type: 'document',
      size: '856 KB',
      course: 'Machine Learning',
      uploadedBy: 'Dr. Smith',
      uploadDate: '2024-12-14',
      downloads: 28,
      isStarred: false,
      version: '1.0',
      tags: ['assignment', 'neural-networks']
    },
    {
      id: 3,
      name: 'Binary Search Tree Implementation Demo',
      type: 'video',
      size: '45.2 MB',
      course: 'Data Structures',
      uploadedBy: 'TA Mike',
      uploadDate: '2024-12-12',
      downloads: 67,
      isStarred: true,
      version: '1.0',
      tags: ['demo', 'BST', 'implementation']
    },
    {
      id: 4,
      name: 'Software Architecture Patterns',
      type: 'document',
      size: '1.8 MB',
      course: 'Software Engineering',
      uploadedBy: 'Dr. Brown',
      uploadDate: '2024-12-10',
      downloads: 35,
      isStarred: false,
      version: '2.1',
      tags: ['architecture', 'patterns', 'design']
    },
    {
      id: 5,
      name: 'Database Schema Examples',
      type: 'image',
      size: '3.2 MB',
      course: 'Database Systems',
      uploadedBy: 'Dr. Johnson',
      uploadDate: '2024-12-08',
      downloads: 21,
      isStarred: false,
      version: '1.0',
      tags: ['schema', 'examples', 'ER-diagram']
    },
    {
      id: 6,
      name: 'Course Syllabus - Spring 2025',
      type: 'document',
      size: '245 KB',
      course: 'Machine Learning',
      uploadedBy: 'Dr. Smith',
      uploadDate: '2024-12-05',
      downloads: 89,
      isStarred: true,
      version: '1.0',
      tags: ['syllabus', 'schedule', 'requirements']
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'presentation': return FileText;
      case 'video': return FileVideo;
      case 'image': return FileImage;
      default: return File;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-blue-400';
      case 'presentation': return 'text-emerald-400';
      case 'video': return 'text-red-400';
      case 'image': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCourse = selectedCourse === 'all' || doc.course.toLowerCase().includes(selectedCourse);
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesCourse && matchesType;
  });

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredDocuments.map((doc) => {
        const IconComponent = getFileIcon(doc.type);
        return (
          <Card key={doc.id} className="group hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 bg-muted rounded-lg ${getFileTypeColor(doc.type)}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex items-center space-x-1">
                  {doc.isStarred && <Star className="w-4 h-4 text-amber-400 fill-current" />}
                  <Button variant="ghost" size="icon" className="w-6 h-6 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm line-clamp-2 text-foreground">{doc.name}</h4>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{doc.size}</span>
                  <span>v{doc.version}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1 mb-1">
                    <User className="w-3 h-3" />
                    <span>{doc.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                  {doc.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{doc.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Download className="w-3 h-3" />
                    <span>{doc.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2">
      {filteredDocuments.map((doc) => {
        const IconComponent = getFileIcon(doc.type);
        return (
          <Card key={doc.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 bg-muted rounded-lg ${getFileTypeColor(doc.type)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm truncate text-foreground">{doc.name}</h4>
                    {doc.isStarred && <Star className="w-4 h-4 text-amber-400 fill-current shrink-0" />}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span>{doc.course}</span>
                    <span>{doc.uploadedBy}</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Download className="w-3 h-3" />
                    <span>{doc.downloads}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Repository</h1>
          <p className="text-muted-foreground">Access course materials, assignments, and resources</p>
        </div>
        {(userRole === 'faculty' || userRole === 'admin' || userRole === 'ta') && (
          <Button className="bg-primary">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        )}
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-xl font-bold">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileVideo className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-xl font-bold">{documents.filter(d => d.type === 'video').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-xl font-bold">{documents.filter(d => d.type === 'document').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-xl font-bold">{documents.reduce((sum, doc) => sum + doc.downloads, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search documents, tags, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="File type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="presentation">Presentations</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Hash,
  Users,
  Mic,
  Plus
} from 'lucide-react';

interface ChatProps {
  userRole: string;
}

export function Chat({ userRole }: ChatProps) {
  const [selectedChat, setSelectedChat] = useState('db-general');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chatRooms = [
    {
      id: 'db-general',
      name: 'Database Systems - General',
      type: 'course',
      participants: 45,
      unread: 3,
      lastMessage: 'Can someone explain indexing?',
      lastTime: '2m ago',
      isActive: true
    },
    {
      id: 'ml-project',
      name: 'ML Project Team Alpha',
      type: 'group',
      participants: 4,
      unread: 0,
      lastMessage: 'Meeting at 3 PM tomorrow',
      lastTime: '15m ago',
      isActive: false
    },
    {
      id: 'dr-johnson',
      name: 'Dr. Johnson',
      type: 'direct',
      participants: 2,
      unread: 1,
      lastMessage: 'Your assignment looks great!',
      lastTime: '1h ago',
      isActive: true
    },
    {
      id: 'se-announcements',
      name: 'Software Eng - Announcements',
      type: 'announcement',
      participants: 52,
      unread: 0,
      lastMessage: 'Exam schedule updated',
      lastTime: '2h ago',
      isActive: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Alex Chen',
      content: 'Hey everyone! I\'m having trouble understanding B+ trees. Can someone help?',
      timestamp: '10:30 AM',
      isOwn: false,
      avatar: 'AC',
      type: 'text'
    },
    {
      id: 2,
      sender: 'Dr. Johnson',
      content: 'Great question Alex! B+ trees are a variation of B-trees where all data is stored in leaf nodes.',
      timestamp: '10:32 AM',
      isOwn: false,
      avatar: 'DJ',
      type: 'text'
    },
    {
      id: 3,
      sender: 'You',
      content: 'Thanks Dr. Johnson! That makes more sense now.',
      timestamp: '10:35 AM',
      isOwn: true,
      avatar: 'ME',
      type: 'text'
    },
    {
      id: 4,
      sender: 'Sarah Martinez',
      content: 'I found this great visualization tool for B+ trees:',
      timestamp: '10:37 AM',
      isOwn: false,
      avatar: 'SM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'Sarah Martinez',
      content: 'btree-visualization.pdf',
      timestamp: '10:37 AM',
      isOwn: false,
      avatar: 'SM',
      type: 'file'
    },
    {
      id: 6,
      sender: 'Dr. Johnson',
      content: '🎙️ Voice message (0:45)',
      timestamp: '10:40 AM',
      isOwn: false,
      avatar: 'DJ',
      type: 'voice'
    }
  ];

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'course': return Hash;
      case 'group': return Users;
      case 'direct': return MessageCircle;
      case 'announcement': return MessageCircle;
      default: return MessageCircle;
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage('');
    }
  };

  const filteredChats = chatRooms.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-card rounded-lg border">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Chat Rooms List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChats.map((chat) => {
              const IconComponent = getChatIcon(chat.type);
              return (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === chat.id 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="p-2 bg-muted rounded-full">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {chat.isActive && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                        {chat.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs min-w-5 h-5 flex items-center justify-center p-0">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="truncate">{chat.lastMessage}</span>
                        <span className="ml-2 shrink-0">{chat.lastTime}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {chat.participants} {chat.participants === 1 ? 'participant' : 'participants'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* New Chat Button */}
        <div className="p-4 border-t border-border">
          <Button className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Database Systems - General</h2>
                <p className="text-sm text-muted-foreground">45 participants • 12 online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-2xl ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`space-y-1 ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {!msg.isOwn && <span className="font-medium">{msg.sender}</span>}
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      msg.isOwn 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    } ${
                      msg.type === 'file' ? 'border border-border cursor-pointer hover:bg-muted/80' : ''
                    }`}>
                      {msg.type === 'file' ? (
                        <div className="flex items-center space-x-2">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-sm">{msg.content}</span>
                        </div>
                      ) : msg.type === 'voice' ? (
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Mic className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-24 h-1 bg-muted-foreground/20 rounded-full">
                                <div className="w-8 h-1 bg-primary rounded-full"></div>
                              </div>
                              <span className="text-xs">0:45</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{msg.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">AC</AvatarFallback>
              </Avatar>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs">Alex is typing...</span>
            </div>
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button onClick={handleSendMessage} className="bg-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
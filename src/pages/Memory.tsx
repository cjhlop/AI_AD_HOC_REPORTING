import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, FileText, Trash2, MoreHorizontal, Download } from 'lucide-react';
import ChatListSidebar from '@/components/ChatListSidebar';
import { useNavigate } from 'react-router-dom';

const knowledgeBaseFiles = [
  { name: 'Q4_Marketing_Strategy.pdf', type: 'PDF', size: '2.1 MB', updated: '2023-10-15' },
  { name: 'Brand_Voice_Guidelines.docx', type: 'DOCX', size: '850 KB', updated: '2023-10-12' },
  { name: 'Product_One_Pager.pdf', type: 'PDF', size: '1.2 MB', updated: '2023-09-28' },
];

const Memory = () => {
  const navigate = useNavigate();

  // Mock data and handlers for the sidebar
  const savedChats = [
    { id: 2, title: "Creative optimization insights", time: "Yesterday", saved: true, isRecurring: true },
    { id: 4, title: "CPC trend analysis", time: "3 days ago", saved: true, isRecurring: false },
  ];
  const mostUsedChats = [
    { id: 1, title: "Campaign performance analysis", time: "2 hours ago" },
    { id: 3, title: "Visitor behavior patterns", time: "2 days ago" },
  ];
  const recentUnsavedChats = [
    { id: 5, title: "Visitor conversion funnel analysis", time: "4 days ago" },
    { id: 6, title: "Show US-based SaaS visitors from pricing page", time: "5 days ago" },
    { id: 7, "title": "Weekly performance breakdown by campaign", time: "6 days ago" },
  ];

  const handleNewChat = () => {
    navigate('/ai-chat');
  };

  const handleChatSelect = () => {
    navigate('/ai-chat');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <ChatListSidebar
            onNewChat={handleNewChat}
            onChatSelect={handleChatSelect}
            savedChats={savedChats}
            mostUsedChats={mostUsedChats}
            recentUnsavedChats={recentUnsavedChats}
          />
          <main className="flex-1 p-6 overflow-auto bg-gray-100">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">AI Memory & Context</h1>
                <p className="text-gray-600">Provide context about your company to receive more personalized and accurate responses.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Instructions</CardTitle>
                    <CardDescription>
                      Define your company's voice, target audience, and key messaging. The AI will use this as a primary guide.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="e.g., Our company, Acme Corp, sells productivity software to enterprise clients. Our brand voice is professional yet approachable. We want to focus on ROI and efficiency in our messaging..."
                      className="min-h-[150px]"
                    />
                  </CardContent>
                  <div className="flex justify-end p-6 pt-0">
                    <Button>Save Instructions</Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base</CardTitle>
                    <CardDescription>
                      Upload documents like product specs, marketing plans, or brand guidelines for the AI to reference.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop files here</h3>
                      <p className="mt-1 text-sm text-gray-600">or</p>
                      <Button variant="outline" className="mt-2">
                        Browse Files
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">PDF, DOCX, TXT, CSV up to 25MB</p>
                    </div>

                    <h4 className="text-md font-medium text-gray-800 mb-3">Uploaded Documents</h4>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {knowledgeBaseFiles.map((file) => (
                            <TableRow key={file.name}>
                              <TableCell className="font-medium flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                {file.name}
                              </TableCell>
                              <TableCell>{file.type}</TableCell>
                              <TableCell>{file.size}</TableCell>
                              <TableCell>{file.updated}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Download</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Memory;
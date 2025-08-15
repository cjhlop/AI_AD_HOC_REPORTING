import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

const WebID = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto bg-secondary rounded-full p-3 w-fit mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle>WebID Visitor Insights</CardTitle>
              <CardDescription>
                This feature is coming soon. Your website visitor identification and analytics will be displayed here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled>Setup WebID Tracking</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default WebID;
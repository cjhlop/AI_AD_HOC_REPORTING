import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

const Campaigns = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto bg-gray-100 rounded-full p-3 w-fit mb-4">
                <Target className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>
                This feature is coming soon. Your campaign data and management tools will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled>Create New Campaign</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Campaigns;
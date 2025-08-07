import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';

const LinkedInAds = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="mx-auto bg-gray-100 rounded-full p-3 w-fit mb-4">
                <BarChart3 className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle>LinkedIn Ads Analytics</CardTitle>
              <CardDescription>
                This feature is coming soon. Your LinkedIn Ads analytics will be displayed here once available.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled>Connect LinkedIn Account</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default LinkedInAds;
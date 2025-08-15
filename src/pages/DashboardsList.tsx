import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const dashboardsData = [
  {
    id: 'marketing-overview',
    name: 'Marketing Performance Overview',
    description: 'A comprehensive view of all marketing channels and campaign performance.',
    dateCreated: '2023-10-01',
    owner: 'John Doe',
    dateUpdated: '2023-10-25',
    shared: true,
  },
  {
    id: 'linkedin-deep-dive',
    name: 'LinkedIn Ads Deep Dive',
    description: 'Detailed analysis of LinkedIn campaign metrics, including CPC, CTR, and conversions.',
    dateCreated: '2023-09-15',
    owner: 'Jane Smith',
    dateUpdated: '2023-10-24',
    shared: true,
  },
  {
    id: 'website-visitor-analysis',
    name: 'Website Visitor Analysis',
    description: 'Insights into website visitor behavior, traffic sources, and conversion funnels.',
    dateCreated: '2023-09-01',
    owner: 'John Doe',
    dateUpdated: '2023-10-20',
    shared: false,
  },
  {
    id: 'executive-summary',
    name: 'Executive Summary Dashboard',
    description: 'High-level summary of key marketing KPIs for executive reporting.',
    dateCreated: '2023-08-20',
    owner: 'Admin',
    dateUpdated: '2023-10-22',
    shared: true,
  },
];

const DashboardsList = () => {
  const navigate = useNavigate();

  const handleRowClick = (dashboardId: string) => {
    navigate(`/dashboards/${dashboardId}`);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Dashboards</CardTitle>
                  <CardDescription>
                    Select a dashboard to view detailed analytics.
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Dashboard
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Date Updated</TableHead>
                    <TableHead>Shared</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardsData.map((dashboard) => (
                    <TableRow 
                      key={dashboard.id} 
                      onClick={() => handleRowClick(dashboard.id)}
                      className="cursor-pointer hover:bg-secondary"
                    >
                      <TableCell className="font-medium text-primary">{dashboard.name}</TableCell>
                      <TableCell>{dashboard.description}</TableCell>
                      <TableCell>{dashboard.dateCreated}</TableCell>
                      <TableCell>{dashboard.owner}</TableCell>
                      <TableCell>{dashboard.dateUpdated}</TableCell>
                      <TableCell>
                        <Badge variant={dashboard.shared ? 'default' : 'secondary'}>
                          {dashboard.shared ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardsList;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, RefreshCw, Settings, PinIcon } from 'lucide-react';

interface Lead {
  company: string;
  website: string;
  industry: string;
  lastVisit: string;
  source: string;
}

interface LeadsTableProps {
  leadsData: Lead[];
}

const LeadsTable = ({ leadsData }: LeadsTableProps) => {
  const handleDownload = () => {
    const headers = ["Company", "Website", "Industry", "Last Visit", "Source"];
    const csvRows = [
      headers.join(','),
      ...leadsData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'leads_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Identified Website Visitors</CardTitle>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <PinIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2 font-medium">Company</th>
                <th className="text-left p-2 font-medium">Website</th>
                <th className="text-left p-2 font-medium">Industry</th>
                <th className="text-left p-2 font-medium">Last Visit</th>
                <th className="text-left p-2 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {leadsData.map((row: Lead, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium text-blue-600">{row.company}</td>
                  <td className="p-2">{row.website}</td>
                  <td className="p-2">{row.industry}</td>
                  <td className="p-2">{row.lastVisit}</td>
                  <td className="p-2">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTable;
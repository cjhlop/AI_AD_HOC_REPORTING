import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Settings, PinIcon } from 'lucide-react';

interface AnalysisTableProps {
  tableData: any[];
}

const AnalysisTable = ({ tableData }: AnalysisTableProps) => {
  return (
    <Card className="mb-6 dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Creative Performance Details</CardTitle>
          <div className="flex items-center space-x-2">
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
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-2 font-medium">Creative</th>
                <th className="text-left p-2 font-medium">Impressions</th>
                <th className="text-left p-2 font-medium">Clicks</th>
                <th className="text-left p-2 font-medium">CTR</th>
                <th className="text-left p-2 font-medium">Conversions</th>
                <th className="text-left p-2 font-medium">CPA</th>
                <th className="text-left p-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row: any, index: number) => (
                <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="p-2 font-medium">{row.creative}</td>
                  <td className="p-2">{row.impressions.toLocaleString()}</td>
                  <td className="p-2">{row.clicks.toLocaleString()}</td>
                  <td className="p-2">{row.ctr}%</td>
                  <td className="p-2">{row.conversions}</td>
                  <td className="p-2">${row.cpa}</td>
                  <td className="p-2">
                    <Badge variant={row.status === 'Top Performer' ? 'default' : 
                                 row.status === 'Underperforming' ? 'destructive' : 'secondary'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTable;
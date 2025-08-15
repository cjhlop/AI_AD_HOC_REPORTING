import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const closedDeals = [
    { company: "Global Corp", status: "Won", amount: "$50,000" },
    { company: "NextGen Inc.", status: "Lost", amount: "$25,000" },
];
const pipeline = [
    { company: "Data Systems", stage: "Proposal", amount: "$75,000" },
];

const InfluencedRevenueTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Influenced Revenue</CardTitle>
          <Select defaultValue="90d">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Attribution Window" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="180d">180 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Updated 20 min ago</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-sm font-medium">Closed Won</p>
                <p className="text-lg font-bold">$1.2M</p>
                <p className="text-xs text-muted-foreground">15 deals</p>
            </div>
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-sm font-medium">Open Pipeline</p>
                <p className="text-lg font-bold">$3.4M</p>
                <p className="text-xs text-muted-foreground">42 deals</p>
            </div>
        </div>
        <Tabs defaultValue="closed">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="closed">Closed Deals</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            </TabsList>
            <TabsContent value="closed">
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Company</TableHead><TableHead>Status</TableHead><TableHead>Amount</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        {closedDeals.map(d => <TableRow key={d.company}><TableCell>{d.company}</TableCell><TableCell><Badge variant={d.status === 'Won' ? 'default' : 'secondary'}>{d.status}</Badge></TableCell><TableCell>{d.amount}</TableCell></TableRow>)}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="pipeline">
                <Table>
                    <TableHeader>
                        <TableRow><TableHead>Company</TableHead><TableHead>Stage</TableHead><TableHead>Amount</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                        {pipeline.map(d => <TableRow key={d.company}><TableCell>{d.company}</TableCell><TableCell>{d.stage}</TableCell><TableCell>{d.amount}</TableCell></TableRow>)}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <Badge>Auto-Exclusion: Enabled</Badge>
        <Link to="/module/influenced-revenue" className="self-end mt-2">
            <Button variant="ghost" size="sm">
                Open Influenced Revenue
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InfluencedRevenueTile;
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { Link } from "react-router-dom";

const trendData = Array.from({ length: 30 }, (_, i) => ({ name: `Day ${i+1}`, companies: 100 + Math.random() * 50, contacts: 20 + Math.random() * 10 }));
const topCompanies = [
    { name: "Acme Corp", industry: "Manufacturing", lastSeen: "1h ago" },
    { name: "Stark Industries", industry: "Defense", lastSeen: "3h ago" },
];
const topContacts = [
    { name: "Jane Doe", title: "Marketing Manager", company: "Acme Corp" },
    { name: "John Smith", title: "Sales Director", company: "Stark Industries" },
];

const WebIdTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>WebID</CardTitle>
          <Button variant="ghost" size="icon">
            <Info className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>Updated 8 min ago</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-xs font-medium text-muted-foreground">Identified Companies (30d)</p>
                <p className="text-lg font-bold">1,204</p>
            </div>
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-xs font-medium text-muted-foreground">Identified Contacts (30d)</p>
                <p className="text-lg font-bold">345</p>
            </div>
            <div className="p-2 rounded-lg bg-[#C4DAFD]">
                <p className="text-xs font-medium text-muted-foreground">High-Intent Visits (7d)</p>
                <p className="text-lg font-bold">89</p>
            </div>
        </div>
        <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                    <defs>
                        <linearGradient id="colorWebId" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="companies" stroke="hsl(var(--primary))" fill="url(#colorWebId)" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
        <Tabs defaultValue="companies">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="companies">Top Companies</TabsTrigger>
                <TabsTrigger value="contacts">Top Contacts</TabsTrigger>
            </TabsList>
            <TabsContent value="companies">
                <Table>
                    <TableBody>
                        {topCompanies.map(c => <TableRow key={c.name}><TableCell className="font-medium">{c.name}</TableCell><TableCell>{c.industry}</TableCell><TableCell className="text-right">{c.lastSeen}</TableCell></TableRow>)}
                    </TableBody>
                </Table>
            </TabsContent>
            <TabsContent value="contacts">
                <Table>
                    <TableBody>
                        {topContacts.map(c => <TableRow key={c.name}><TableCell className="font-medium">{c.name}</TableCell><TableCell>{c.title}</TableCell><TableCell className="text-right">{c.company}</TableCell></TableRow>)}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <Link to="/module/web-id" className="self-end">
            <Button variant="ghost" size="sm">
                Open WebID
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default WebIdTile;
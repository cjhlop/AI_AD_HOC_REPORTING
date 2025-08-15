import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const budgetGroups = [
    { name: "Core Campaigns", spend: 4500, budget: 10000, status: "On Track" },
    { name: "Experiment Group", spend: 2500, budget: 2000, status: "Exceeded" },
    { name: "Q4 Push", spend: 8000, budget: 12000, status: "At Risk" },
]

const BudgetControlTile = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Budget Control</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Forecast is a straight-line projection.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Updated 1 min ago</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Accordion type="single" collapsible defaultValue="item-0">
            {budgetGroups.map((group, i) => (
                <AccordionItem value={`item-${i}`} key={group.name}>
                    <AccordionTrigger>
                        <div className="flex items-center justify-between w-full">
                            <span>{group.name}</span>
                            <Badge variant={group.status === 'Exceeded' ? 'destructive' : group.status === 'At Risk' ? 'secondary' : 'default'}>{group.status}</Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>${group.spend.toLocaleString()}</span>
                            <span className="text-muted-foreground">${group.budget.toLocaleString()}</span>
                        </div>
                        <Progress value={(group.spend / group.budget) * 100} />
                        <p className="text-xs text-muted-foreground">Predicted EOM: ${ (group.spend * 1.5).toLocaleString() }</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex-col items-start pt-4 border-t">
        <p className="text-xs text-muted-foreground">Auto-paused campaigns this month: 4</p>
        <Link to="/module/budget-control" className="self-end mt-2">
            <Button variant="ghost" size="sm">
                Open Budget Control
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BudgetControlTile;
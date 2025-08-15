import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockHealthChecks } from "@/data/mockDashboardData";
import { HealthCheck, HealthCheckSeverity } from "../../types";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

const severityMap: Record<HealthCheckSeverity, { icon: React.ElementType, color: string }> = {
    Error: { icon: AlertCircle, color: "text-destructive" },
    Warning: { icon: AlertTriangle, color: "text-accent" },
    Info: { icon: Info, color: "text-blue-500" },
};

const HealthCheckItem = ({ check }: { check: HealthCheck }) => {
    const { icon: Icon, color } = severityMap[check.severity];
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link to={check.moduleHref} className="block">
                        <div className="flex items-start gap-4 p-3 transition-colors rounded-lg hover:bg-secondary">
                            <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", color)} />
                            <div className="flex-grow">
                                <p className="font-medium">{check.title}</p>
                                <p className="text-sm text-muted-foreground">{check.description}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Last run: {formatDistanceToNow(new Date(check.lastRunAt), { addSuffix: true })}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const HealthChecks = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Checks & Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            {mockHealthChecks.map(check => (
                <HealthCheckItem key={check.id} check={check} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthChecks;
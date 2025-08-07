import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BentoCard = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className={cn("bg-card p-6 rounded-lg border shadow-sm relative overflow-hidden", className)}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Acme Corp</h1>
        <p className="text-muted-foreground">Here's your command center for marketing intelligence.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Co-Pilot Card */}
        <BentoCard className="lg:col-span-2 bg-primary text-primary-foreground">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-12 w-32 h-32 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <MessageSquare className="h-8 w-8 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">AI Co-Pilot</h2>
            <p className="mb-6 max-w-md">
              Ask complex questions, get instant answers. Your natural language interface to all your marketing data.
            </p>
            <Link to="/ai-chat">
              <Button variant="secondary" size="lg">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </BentoCard>

        {/* LinkedIn Ads Card */}
        <BentoCard>
          <BarChart3 className="h-8 w-8 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">LinkedIn Ads</h2>
          <p className="text-muted-foreground mb-4">
            Analyze campaign performance, CTR, and CPA.
          </p>
          <Link to="/linkedin-ads">
            <Button variant="outline" className="w-full">View Analytics</Button>
          </Link>
        </BentoCard>

        {/* WebID Card */}
        <BentoCard>
          <Users className="h-8 w-8 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">WebID Visitors</h2>
          <p className="text-muted-foreground mb-4">
            Identify and understand your anonymous website traffic.
          </p>
          <Link to="/webid">
            <Button variant="outline" className="w-full">Explore Visitors</Button>
          </Link>
        </BentoCard>

        {/* Dashboards Card */}
        <BentoCard className="lg:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">Custom Dashboards</h2>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your saved visualizations and reports, ready for analysis.
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <Link to="/dashboards">
            <Button className="w-full">Go to Dashboards</Button>
          </Link>
        </BentoCard>
      </div>
    </div>
  );
};

export default Index;
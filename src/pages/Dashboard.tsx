import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import AdsSchedulingTile from "../components/dashboard/tiles/AdsSchedulingTile";
import FrequencyCapTile from "../components/dashboard/tiles/FrequencyCapTile";
import AudienceTuningTile from "../components/dashboard/tiles/AudienceTuningTile";
import BudgetControlTile from "../components/dashboard/tiles/BudgetControlTile";
import InfluencedRevenueTile from "../components/dashboard/tiles/InfluencedRevenueTile";
import WebIdTile from "../components/dashboard/tiles/WebIdTile";
import CostSavingsChart from "../components/dashboard/CostSavingsChart";
import CostPerLeadChart from "../components/dashboard/CostPerLeadChart";
import AudiencesTable from "../components/dashboard/AudiencesTable";
import EngagementChart from "../components/dashboard/EngagementChart";
import FunnelMovementChart from "../components/dashboard/FunnelMovementChart";
import HealthChecks from "../components/dashboard/HealthChecks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Dashboard = () => {
  const [selectedAudienceId, setSelectedAudienceId] = useState<string | null>(null);

  const handleAudienceSelect = (id: string | null) => {
    setSelectedAudienceId(id);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 overflow-y-auto md:p-6">
          <div className="space-y-6">
            {/* Row 1: Funnel on top, full width */}
            <FunnelMovementChart />

            {/* Row 2: Audiences Table (same width as Funnel) */}
            <AudiencesTable 
              onAudienceSelect={handleAudienceSelect}
              selectedAudienceId={selectedAudienceId}
            />

            {/* Row 3: Engagement & Funnel (Funnel removed to keep it single on top) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <EngagementChart selectedAudienceId={selectedAudienceId} />
               <HealthChecks />
            </div>
            
            {/* Row 4: Collapsed Metrics */}
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">Performance Metrics</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-6 pt-4 lg:grid-cols-2">
                    <CostPerLeadChart />
                    <CostSavingsChart />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Row 5: Module Snapshots */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold tracking-tight">Modules</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AdsSchedulingTile />
                <FrequencyCapTile />
                <AudienceTuningTile />
                <BudgetControlTile />
                <InfluencedRevenueTile />
                <WebIdTile />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
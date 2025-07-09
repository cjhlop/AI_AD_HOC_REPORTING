import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Pin, 
  Download, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Sparkles,
  BarChart,
  Target,
  Lightbulb,
  Rocket
} from 'lucide-react';
import KeyInsights from './chat/KeyInsights';
import AnalysisChart from './chat/AnalysisChart';
import AnalysisTable from './chat/AnalysisTable';
import AnalysisSection from './chat/AnalysisSection';

interface ChatMessageProps {
  message: {
    id: number;
    type: 'user' | 'ai';
    content: string;
    timestamp: Date;
    icon?: React.ElementType;
    hasChart?: boolean;
    hasTable?: boolean;
    chartData?: any;
    tableData?: any;
    insights?: any;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md flex items-center gap-2">
          <p className="text-sm flex-grow">{message.content}</p>
          {message.icon && <message.icon className="w-4 h-4 text-white flex-shrink-0" />}
        </div>
      </div>
    );
  }

  // AI Response
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl w-full shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-gray-900 leading-relaxed">{message.content}</p>
            </div>

            {message.insights && <KeyInsights insights={message.insights} />}
            {message.hasChart && message.chartData && <AnalysisChart chartData={message.chartData} />}
            {message.hasTable && message.tableData && <AnalysisTable tableData={message.tableData} />}

            <AnalysisSection title="Analysis Summary" icon={<BarChart className="w-5 h-5" />}>
              <p><strong>Performance Overview:</strong> Your creative portfolio shows significant variation in performance, with Creative A emerging as the clear winner. The data reveals a 128% performance gap between your best and worst performing creatives, indicating substantial optimization opportunities.</p>
              <p><strong>Key Findings:</strong> Creative A demonstrates exceptional efficiency with a 3.2% CTR (60% above campaign average) and the lowest CPA at $67. In contrast, Creative C is underperforming with a 1.4% CTR and CPA of $156 - more than double your target cost per acquisition.</p>
              <p><strong>Budget Impact:</strong> Currently, your budget allocation doesn't align with performance. Creative A, despite driving 33% of total conversions, likely receives equal budget share. Reallocating spend could improve overall campaign ROAS by an estimated 25-30%.</p>
            </AnalysisSection>

            <AnalysisSection title="Strategic Insights" icon={<Target className="w-5 h-5" />} variant="primary">
              <p><strong>Creative Messaging Analysis:</strong> "Transform Your Business" (Creative A) resonates strongly with your target audience, suggesting transformation-focused messaging outperforms feature-based copy. This insight should inform future creative development.</p>
              <p><strong>Audience Alignment:</strong> The performance variance suggests different creatives appeal to different audience segments. Creative B shows promise but may need audience refinement or different placement strategies to reach its full potential.</p>
              <p><strong>Competitive Positioning:</strong> Your top-performing creative's 3.2% CTR significantly exceeds industry benchmarks (typically 0.9-2.1% for LinkedIn), indicating strong market positioning and message-market fit.</p>
            </AnalysisSection>

            <AnalysisSection title="Actionable Recommendations" icon={<Lightbulb className="w-5 h-5" />} variant="success">
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Immediate Budget Reallocation:</strong> Increase Creative A budget by 40% and reduce Creative C by 60%. Expected impact: +$2,340 monthly savings with 25% more conversions.</li>
                <li><strong>Creative Testing Program:</strong> Launch 3 variations of Creative A with different headlines. Test "Accelerate Growth", "Drive Innovation", and "Unlock Potential" messaging.</li>
                <li><strong>Audience Optimization:</strong> Analyze Creative B's audience data - it may perform better with specific job titles or company sizes. Consider separate campaigns for different segments.</li>
                <li><strong>Performance Monitoring:</strong> Set up automated alerts when CPA exceeds $120 or CTR drops below 2.0%. Review creative performance weekly to catch declining trends early.</li>
              </ol>
            </AnalysisSection>

            <AnalysisSection title="Next Steps" icon={<Rocket className="w-5 h-5" />} variant="warning">
              <p><strong>Timeline:</strong> Implement budget changes within 24 hours to capture immediate savings. Launch creative tests by end of week. Schedule follow-up analysis in 14 days to measure impact and refine strategy further.</p>
              <p><strong>Expected Outcome:</strong> These optimizations should improve overall campaign efficiency by 20-30%, reduce average CPA to $75-80, and increase monthly conversion volume by 15-20 conversions.</p>
            </AnalysisSection>

            <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
              <Button size="sm" variant="outline">
                <Pin className="w-3 h-3 mr-1" />
                Pin
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-3 h-3 mr-1" />
                Export Report
              </Button>
              <Button size="sm" variant="outline">
                <Copy className="w-3 h-3 mr-1" />
                Copy Analysis
              </Button>
              <div className="flex-1" />
              <Button size="sm" variant="ghost">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost">
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
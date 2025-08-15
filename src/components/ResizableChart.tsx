import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  RefreshCw, 
  Settings, 
  Pin, 
  Download, 
  Maximize2, 
  Minimize2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface ResizableChartProps {
  title: string;
  type: 'bar' | 'line' | 'pie';
  data: any[];
  insights?: any[];
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

const ResizableChart: React.FC<ResizableChartProps> = ({
  title,
  type,
  data,
  insights = [],
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 300,
  minHeight = 200
}) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
      const newHeight = Math.max(minHeight, startHeight + (e.clientY - startY));
      
      setDimensions({
        width: newWidth,
        height: newHeight
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const renderChart = () => {
    const chartHeight = dimensions.height - 120; // Account for header and padding

    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ctr" fill="#3B82F6" name="CTR %" />
              <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`relative ${isMaximized ? 'fixed inset-4 z-50 shadow-2xl' : ''} ${isResizing ? 'select-none' : ''}`}
      style={!isMaximized ? { width: dimensions.width, height: dimensions.height } : {}}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Pin className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
              <Download className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 w-8 p-0"
              onClick={toggleMaximize}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Insights Row */}
        {insights.length > 0 && (
          <div className="flex items-center space-x-4 pt-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`p-1 rounded-full ${
                  insight.trend === 'up' ? 'bg-green-100' : 
                  insight.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {insight.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                  {insight.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-600" />}
                  {insight.trend === 'neutral' && <Minus className="w-3 h-3 text-gray-600" />}
                </div>
                <div>
                  <p className="text-xs text-gray-600">{insight.label}</p>
                  <p className="text-sm font-semibold">{insight.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {renderChart()}
      </CardContent>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 border-r border-b border-gray-400"></div>
        </div>
      )}
    </Card>
  );
};

export default ResizableChart;
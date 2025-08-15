import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FunnelProps, FunnelStage } from "../../types";
import { Users, Eye, MousePointerClick, FileText, Handshake, CheckCircle } from "lucide-react";
import useElementSize from "@/hooks/useElementSize";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, Variants } from "framer-motion";

const defaultStages: FunnelStage[] = [
  { id: "total_audience", label: "Total Audience", icon: <Users className="w-5 h-5" />, value: 1_000_000 },
  { id: "seen", label: "Saw the Ad", icon: <Eye className="w-5 h-5" />, value: 500_000 },
  { id: "interacted", label: "Interacted", icon: <MousePointerClick className="w-5 h-5" />, value: 50_000 },
  { id: "form_fill", label: "Form Fill", icon: <FileText className="w-5 h-5" />, value: 5_000 },
  { id: "deal_created", label: "Deal Created", icon: <Handshake className="w-5 h-5" />, value: 2_400 },
  { id: "deal_closed", label: "Deal Closed", icon: <CheckCircle className="w-5 h-5" />, value: 1_500 },
];

// Configure branch split for the final stage
const finalBranch = {
  won: 600,
  lost: 900,
};

const formatPercentage = (value: number) => {
  if (value < 0.01 && value > 0) return "<0.1%";
  if (value < 1) return `${value.toFixed(1)}%`;
  return `${Math.round(value)}%`;
};

type Segment = {
  core: string;
  halo1: string;
  halo2: string;
  stageIndex: number;
  fillKind: "accent" | "success" | "destructive";
};

const FunnelChart = ({ stages = defaultStages, className }: FunnelProps) => {
  const [ref, { width, height }] = useElementSize<HTMLDivElement>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const derivedData = useMemo(() => {
    if (!stages || stages.length === 0 || width === 0) return null;
    const baseline = stages[0].value;
    if (baseline === 0) return { isEmpty: true, points: [] as (FunnelStage & { pctOfStart: number; dropFromPrev: number })[] };
    const points = stages.map((stage, i) => ({
      ...stage,
      pctOfStart: stage.value / baseline,
      dropFromPrev: i > 0 ? 1 - stage.value / stages[i - 1].value : 0,
    }));
    return { isEmpty: false, points };
  }, [stages, width]);

  const pathSegments: Segment[] = useMemo(() => {
    if (!derivedData || !derivedData.points.length || width === 0 || height === 0) return [];

    const segments: Segment[] = [];
    const maxBandHalfHeight = height * 0.2;
    const midY = height / 2;
    const columnWidth = width / stages.length;

    const stageHalfHeights = derivedData.points.map((p) => Math.max(1.5, maxBandHalfHeight * p.pctOfStart));

    const curvedPath = (
      xLeft: number,
      xRight: number,
      topLeft: number,
      bottomLeft: number,
      topRight: number,
      bottomRight: number,
      scale: number
    ) => {
      const scaleY = (y: number) => (y < midY ? midY - (midY - y) * scale : midY + (y - midY) * scale);
      const sTopLeft = scaleY(topLeft);
      const sBottomLeft = scaleY(bottomLeft);
      const sTopRight = scaleY(topRight);
      const sBottomRight = scaleY(bottomRight);
      const cp1x = xLeft + (xRight - xLeft) / 2;
      const cp2x = xRight - (xRight - xLeft) / 2;

      return `M ${xLeft},${sTopLeft} C ${cp1x},${sTopLeft} ${cp2x},${sTopRight} ${xRight},${sTopRight} L ${xRight},${sBottomRight} C ${cp2x},${sBottomRight} ${cp1x},${sBottomLeft} ${xLeft},${sBottomLeft} Z`;
    };

    const pushSegment = (
      xLeft: number,
      xRight: number,
      topLeft: number,
      bottomLeft: number,
      topRight: number,
      bottomRight: number,
      stageIndex: number,
      fillKind: Segment["fillKind"]
    ) => {
      segments.push({
        core: curvedPath(xLeft, xRight, topLeft, bottomLeft, topRight, bottomRight, 1),
        halo1: curvedPath(xLeft, xRight, topLeft, bottomLeft, topRight, bottomRight, 1.2),
        halo2: curvedPath(xLeft, xRight, topLeft, bottomLeft, topRight, bottomRight, 1.4),
        stageIndex,
        fillKind,
      });
    };

    const lastIdx = derivedData.points.length - 1;

    for (let i = 0; i < derivedData.points.length; i++) {
      const xLeft = i * columnWidth;
      const xRight = (i + 1) * columnWidth;
      const hLeft = stageHalfHeights[i];
      const hRight = i < lastIdx ? stageHalfHeights[i + 1] : stageHalfHeights[i];

      if (i < lastIdx) {
        // Regular stage section
        const topLeft = midY - hLeft;
        const bottomLeft = midY + hLeft;
        const topRight = midY - hRight;
        const bottomRight = midY + hRight;
        pushSegment(xLeft, xRight, topLeft, bottomLeft, topRight, bottomRight, i, "accent");
      } else {
        // Final stage: branch into won/lost within the same column width
        const gap = Math.max(6, Math.min(14, hLeft * 0.2));
        const twoHeight = 2 * hLeft - gap;

        // Ensure sums make sense; fall back to equal split if mismatch
        const totalClosed = derivedData.points[i].value || 1;
        const won = Math.min(finalBranch.won, totalClosed);
        const lost = Math.max(0, Math.min(finalBranch.lost, totalClosed - won));
        const wonFrac = Math.max(0, Math.min(1, won / totalClosed));
        const lostFrac = Math.max(0, Math.min(1, lost / totalClosed));
        const normalize = wonFrac + lostFrac || 1;
        const wonShare = wonFrac / normalize;
        const lostShare = lostFrac / normalize;

        const wonHeight2 = twoHeight * wonShare;
        const lostHeight2 = twoHeight * lostShare;

        // Won upper band
        const wonTopLeft = midY - hLeft;
        const wonBottomLeft = wonTopLeft + wonHeight2;
        const wonTopRight = midY - hRight;
        const wonBottomRight = wonTopRight + wonHeight2;

        // Lost lower band
        const lostTopLeft = wonBottomLeft + gap;
        const lostBottomLeft = midY + hLeft;
        const lostTopRight = wonBottomRight + gap;
        const lostBottomRight = midY + hRight;

        pushSegment(xLeft, xRight, wonTopLeft, wonBottomLeft, wonTopRight, wonBottomRight, i, "success");
        pushSegment(xLeft, xRight, lostTopLeft, lostBottomLeft, lostTopRight, lostBottomRight, i, "destructive");
      }
    }

    return segments;
  }, [derivedData, width, height, stages.length]);

  const isLoading = !derivedData || width === 0;
  const isEmpty = derivedData?.isEmpty;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Movement (Last 30d)</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={ref} className={cn("relative w-full h-[320px] md:h-[280px]", className)}>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading...</div>
          ) : isEmpty ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No data for selected period</div>
          ) : (
            <AnimatePresence>
              {/* Stage labels + hover targets */}
              <motion.div
                className="relative z-10 grid h-full"
                style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {derivedData.points.map((stage, i) => (
                  <TooltipProvider key={stage.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          onMouseEnter={() => setHoveredIndex(i)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          variants={columnVariants}
                          className={cn(
                            "relative flex flex-col justify-start items-center h-full pt-4 pb-2 transition-opacity duration-200",
                            hoveredIndex !== null && hoveredIndex !== i && "opacity-50"
                          )}
                        >
                          {i > 0 && <div className="absolute top-0 left-0 h-full w-px bg-border" />}
                          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
                            {stage.icon}
                            <span>{stage.label}</span>
                          </div>
                          <div className="text-4xl md:text-5xl font-bold my-3 text-accent">
                            {formatPercentage(stage.pctOfStart * 100)}
                          </div>
                          <div className="text-sm text-muted-foreground mt-auto">
                            <span>{stage.value.toLocaleString()}</span>
                            {i > 0 && (
                              <span className="ml-2 font-semibold text-destructive">
                                -{Math.round(stage.dropFromPrev * 100)}%
                              </span>
                            )}
                            {i === stages.length - 1 && (
                              <span className="ml-2 text-xs">
                                ({finalBranch.won.toLocaleString()} won / {finalBranch.lost.toLocaleString()} lost)
                              </span>
                            )}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p className="font-bold">{stage.label}</p>
                          <p>{stage.value.toLocaleString()} records</p>
                          <p>{formatPercentage(stage.pctOfStart * 100)} of start</p>
                          {i > 0 && <p>-{Math.round(stage.dropFromPrev * 100)}% vs. previous</p>}
                          {i === stages.length - 1 && (
                            <p>
                              Outcomes: {finalBranch.won.toLocaleString()} won / {finalBranch.lost.toLocaleString()} lost
                            </p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </motion.div>

              {/* Funnel shapes */}
              <div className="absolute inset-0 z-0">
                <svg width={width} height={height}>
                  {pathSegments.map((segment, i) => {
                    const isActive = hoveredIndex === segment.stageIndex;
                    const fillColor =
                      segment.fillKind === "success"
                        ? "hsl(var(--success))"
                        : segment.fillKind === "destructive"
                        ? "hsl(var(--destructive))"
                        : "hsl(var(--accent))";

                    return (
                      <g key={i}>
                        <motion.path
                          d={segment.halo2}
                          fill={fillColor}
                          opacity={isActive ? 0.1 : 0.05}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 + i * 0.05 }}
                        />
                        <motion.path
                          d={segment.halo1}
                          fill={fillColor}
                          opacity={isActive ? 0.2 : 0.1}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 + i * 0.05 }}
                        />
                        <motion.path
                          d={segment.core}
                          fill={fillColor}
                          opacity={isActive ? 0.6 : 0.25}
                          className={cn("transition-opacity", isActive && "animate-glow")}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 + i * 0.05 }}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </AnimatePresence>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const FunnelMovementChart = () => {
  return <FunnelChart stages={defaultStages} />;
};

export default FunnelMovementChart;
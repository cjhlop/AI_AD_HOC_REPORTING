import type React from 'react';

export type AudienceSource = "LI" | "WebID" | "CRM";
export type BenchmarkGap = "Below" | "Near" | "Exceeding" | "N/A";
export type HealthCheckSeverity = "Info" | "Warning" | "Error";

export interface Audience {
  id: string;
  name: string;
  source: AudienceSource;
  size: number;
  sizeDelta: number;
  engagementRate: number;
  engagementRateDelta: number;
  benchmarkGap: BenchmarkGap;
  warmLeadsCount: number;
  stageMix: {
    aware: number;
    engaged: number;
    warm: number;
    sql: number;
  };
  engagementHistory: { day: string; rate: number }[];
}

export interface FunnelMovementData {
    unawareToAware: number;
    awareToEngaged: number;
    engagedToWarm: number;
    warmToSql: number;
}

export interface HealthCheck {
    id: string;
    severity: HealthCheckSeverity;
    title: string;
    description: string;
    moduleHref: string;
    lastRunAt: string;
}

// Types for the new Funnel Chart
export interface FunnelStage {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value: number;
}

export interface FunnelProps {
  stages: FunnelStage[];
  className?: string;
}
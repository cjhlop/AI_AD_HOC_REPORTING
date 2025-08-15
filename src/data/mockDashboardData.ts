import { Audience, FunnelMovementData, HealthCheck } from "../types";

export const mockAudiences: Audience[] = [
  {
    id: "1",
    name: "High-Intent Website Visitors",
    source: "WebID",
    size: 12450,
    sizeDelta: 0.05,
    engagementRate: 0.18,
    engagementRateDelta: 0.032,
    benchmarkGap: "Exceeding",
    warmLeadsCount: 312,
    stageMix: { aware: 0.4, engaged: 0.3, warm: 0.2, sql: 0.1 },
    engagementHistory: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.15 + Math.random() * 0.05 })),
  },
  {
    id: "2",
    name: "Q4 Target Accounts (CRM)",
    source: "CRM",
    size: 850,
    sizeDelta: 0.01,
    engagementRate: 0.25,
    engagementRateDelta: -0.015,
    benchmarkGap: "Near",
    warmLeadsCount: 150,
    stageMix: { aware: 0.2, engaged: 0.4, warm: 0.3, sql: 0.1 },
    engagementHistory: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.23 + Math.random() * 0.04 })),
  },
  {
    id: "3",
    name: "LI Campaign Responders",
    source: "LI",
    size: 25000,
    sizeDelta: 0.12,
    engagementRate: 0.08,
    engagementRateDelta: 0.005,
    benchmarkGap: "Below",
    warmLeadsCount: 400,
    stageMix: { aware: 0.6, engaged: 0.25, warm: 0.1, sql: 0.05 },
    engagementHistory: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.07 + Math.random() * 0.02 })),
  },
];

export const mockEngagementData = {
    all: {
        series: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.15 + Math.random() * 0.02 })),
        benchmark: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.16 - Math.random() * 0.01 })),
    },
    "1": {
        series: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.18 + Math.random() * 0.03 })),
        benchmark: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.16 - Math.random() * 0.01 })),
    },
    "2": {
        series: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.25 + Math.random() * 0.02 })),
        benchmark: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.26 - Math.random() * 0.01 })),
    },
    "3": {
        series: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.08 + Math.random() * 0.01 })),
        benchmark: Array.from({ length: 30 }, (_, i) => ({ day: `Day ${i+1}`, rate: 0.10 - Math.random() * 0.01 })),
    },
};

export const mockFunnelMovement: FunnelMovementData = {
    unawareToAware: 1204,
    awareToEngaged: 876,
    engagedToWarm: 124,
    warmToSql: 32,
};

export const mockHealthChecks: HealthCheck[] = [
    { id: '1', severity: 'Warning', title: '4 active campaigns are unscheduled', description: 'Review in Ads Scheduling.', moduleHref: '/module/ads-scheduling', lastRunAt: '2023-10-27T10:00:00Z' },
    { id: '2', severity: 'Error', title: '2 timezone mismatches vs target geo', description: 'Review in Ads Scheduling.', moduleHref: '/module/ads-scheduling', lastRunAt: '2023-10-27T10:00:00Z' },
    { id: '3', severity: 'Warning', title: '3 campaigns lack monthly caps', description: 'Over-frequency observed. Review in Frequency Cap.', moduleHref: '/module/frequency-cap', lastRunAt: '2023-10-27T10:00:00Z' },
    { id: '4', severity: 'Info', title: 'Budget group ‘Default’ forecast +12% over', description: 'Review in Budget Control.', moduleHref: '/module/budget-control', lastRunAt: '2023-10-27T10:00:00Z' },
];
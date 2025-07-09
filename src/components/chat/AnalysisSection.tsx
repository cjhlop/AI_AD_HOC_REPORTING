import React from 'react';
import { cn } from '@/lib/utils';

interface AnalysisSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const variants = {
  default: {
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    text: 'text-gray-800 dark:text-gray-300',
  },
  primary: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-900 dark:text-blue-300',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    text: 'text-yellow-900 dark:text-yellow-300',
  },
};

const AnalysisSection = ({ title, icon, children, variant = 'default' }: AnalysisSectionProps) => {
  const style = variants[variant];

  return (
    <div className="mb-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <div className={cn('rounded-lg p-4 space-y-3', style.bg)}>
        <div className={cn('prose prose-sm max-w-none', style.text)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;
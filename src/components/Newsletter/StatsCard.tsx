import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
  gradient
}) => {
  return (
    <div className={`${gradient} rounded-xl shadow-sm border ${colorClass} p-6 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
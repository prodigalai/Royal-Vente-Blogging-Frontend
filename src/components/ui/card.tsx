import React, { ReactNode } from 'react'

const Card: React.FC<{
  title: string;
  value: number | string;
  icon: ReactNode;
  from: string;
}> = ({ title, value, icon, from }) => (
  <div
    className={`bg-${from}-700 dark:from-${from}-900/20 dark:to-${from}-800/20 rounded-xl shadow-sm border border-${from}-200 dark:border-${from}-800 p-6`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p
          className={`text-sm font-medium text-${from}-600 dark:text-${from}-400`}
        >
          {title}
        </p>
        <p
          className={`text-3xl font-bold text-${from}-700 dark:text-${from}-300`}
        >
          {value}
        </p>
      </div>
      <div className={`p-3 bg-${from}-200 dark:bg-${from}-800 rounded-lg`}>
        {icon}
      </div>
    </div>
  </div>
);

export default Card
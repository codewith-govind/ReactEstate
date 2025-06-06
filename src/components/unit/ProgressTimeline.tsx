import React from "react";

interface ProgressItem {
  date: string; // ISO string or readable string
  title: string;
  description?: string;
}

interface ProgressTimelineProps {
  progressItems: ProgressItem[];
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ progressItems }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Progress Timeline</h3>
      <ol className="relative border-l border-gray-300 dark:border-gray-700">
        {progressItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No progress updates yet.</p>
        ) : (
          progressItems.map((item, idx) => (
            <li key={idx} className="mb-8 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-8 ring-white dark:ring-gray-900">
                <div className="h-3 w-3 rounded-full bg-white" />
              </span>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </time>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white">{item.title}</h4>
              {item.description && (
                <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
              )}
            </li>
          ))
        )}
      </ol>
    </div>
  );
};

export default ProgressTimeline;

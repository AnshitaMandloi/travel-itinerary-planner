import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Moon, 
  Clock, 
  MapPin, 
  DollarSign, 
  Lightbulb, 
  Tag 
} from 'lucide-react';

const TIME_ICONS = {
  morning: { icon: Sun, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  afternoon: { icon: CloudSun, color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200' },
  evening: { icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200' },
};

export default function ActivityItem({ activity, isLast }) {
  const timeKey = (activity.time_of_day || 'morning').toLowerCase();
  const timeConfig = TIME_ICONS[timeKey] || TIME_ICONS.morning;
  const TimeIcon = timeConfig.icon;

  return (
    <div className="relative flex items-start space-x-4 pb-8 group last:pb-2">
      {/* Vertical connector line */}
      {!isLast && (
        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200 group-last:hidden" />
      )}

      {/* Time-of-day Icon node */}
      <div className={`relative z-10 w-10 h-10 rounded-2xl ${timeConfig.bg} ${timeConfig.border} border flex items-center justify-center shrink-0 shadow-sm`}>
        <TimeIcon className={`w-5 h-5 ${timeConfig.color}`} />
      </div>

      {/* Main Activity Details Card */}
      <div className="flex-1 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
        {/* Header row: time slot & category */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
              {activity.time_slot}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200/60">
              {activity.category || 'Sightseeing'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-medium text-slate-500">
            {activity.estimated_cost && (
              <span className="inline-flex items-center font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <DollarSign className="w-3 h-3 mr-0.5 text-emerald-600" />
                {activity.estimated_cost}
              </span>
            )}
            {activity.estimated_duration && (
              <span>⏳ {activity.estimated_duration}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
          {activity.title}
        </h4>

        {/* Location */}
        {activity.location && (
          <div className="flex items-center text-xs font-medium text-slate-500 mt-1 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1 shrink-0" />
            <span>{activity.location}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {activity.description}
        </p>

        {/* Insider Tip Callout */}
        {activity.insider_tip && (
          <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-2 text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Insider Tip: </span>
              <span>{activity.insider_tip}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

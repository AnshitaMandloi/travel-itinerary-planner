import React from 'react';
import { Utensils, Sparkles, Coffee, DollarSign } from 'lucide-react';
import ActivityItem from './ActivityItem';

export default function DayCard({ day }) {
  const { day_number, title, theme, daily_summary, activities, meals_recommendation, estimated_daily_budget } = day;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-100 border border-slate-200/80 mb-8 transition-all hover:border-teal-200">
      {/* Day header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
              {day_number}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {title}
            </h3>
          </div>
          {theme && (
            <div className="flex items-center space-x-1.5 mt-1.5 ml-10">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                {theme}
              </span>
            </div>
          )}
        </div>

        {estimated_daily_budget && (
          <div className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 text-slate-700 border border-slate-200">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Est. Day Budget: <strong>{estimated_daily_budget}</strong></span>
          </div>
        )}
      </div>

      {/* Daily Summary */}
      {daily_summary && (
        <p className="text-sm text-slate-600 italic py-4 border-b border-slate-100">
          "{daily_summary}"
        </p>
      )}

      {/* Meal recommendations */}
      {meals_recommendation && Object.keys(meals_recommendation).length > 0 && (
        <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center space-x-2 mb-2.5">
            <Utensils className="w-4 h-4 text-teal-600" />
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Curated Daily Dining
            </h5>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {meals_recommendation.breakfast && (
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="font-bold text-amber-700 block mb-1">🥐 Breakfast:</span>
                <span className="text-slate-600">{meals_recommendation.breakfast}</span>
              </div>
            )}
            {meals_recommendation.lunch && (
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="font-bold text-sky-700 block mb-1">🥗 Lunch:</span>
                <span className="text-slate-600">{meals_recommendation.lunch}</span>
              </div>
            )}
            {meals_recommendation.dinner && (
              <div className="bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="font-bold text-indigo-700 block mb-1">🍷 Dinner:</span>
                <span className="text-slate-600">{meals_recommendation.dinner}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activities Timeline */}
      <div className="mt-6">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Day Schedule
        </h5>
        <div className="pl-1 sm:pl-2">
          {activities && activities.map((act, idx) => (
            <ActivityItem
              key={idx}
              activity={act}
              isLast={idx === activities.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

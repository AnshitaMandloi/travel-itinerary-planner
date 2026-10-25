import React from 'react';
import { Compass, Info, CheckCircle2 } from 'lucide-react';

export default function TravelTips({ tips = [] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-100 border border-slate-200/80 mb-8">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 mb-5">
        <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Local Practical Wisdom & Tips
          </h3>
          <p className="text-xs text-slate-500">
            Essential etiquette, money advice, and navigational shortcuts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

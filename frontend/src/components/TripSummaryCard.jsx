import React, { useState } from 'react';
import { 
  Compass, 
  Calendar, 
  Users, 
  DollarSign, 
  Bus, 
  Sun, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function TripSummaryCard({ summary, fullItinerary, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `WanderPlan AI - ${summary.destination} (${summary.total_days} Days)
Travel Party: ${summary.travel_party} | Budget: ${summary.budget_tier}
Estimated Cost: ${summary.estimated_total_cost}

Overview:
${summary.vibe_overview}

Transit Advice:
${summary.local_transportation_advice}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullItinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${summary.destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top badges & reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-400" />
            Curated by Gemini AI
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
            <Calendar className="w-3 h-3 mr-1" />
            {summary.total_days} Days
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
            <Users className="w-3 h-3 mr-1" />
            {summary.travel_party}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
            <DollarSign className="w-3 h-3 mr-1 text-emerald-400" />
            {summary.budget_tier} Tier
          </span>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Itinerary</span>
        </button>
      </div>

      {/* Destination title */}
      <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
        {summary.destination}
      </h2>

      {/* Overview */}
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
        {summary.vibe_overview}
      </p>

      {/* Quick metadata grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6 text-xs">
        {summary.estimated_total_cost && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="text-slate-400 font-semibold mb-1 flex items-center">
              <DollarSign className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              Est. Total Cost (Activities, Food & Transit):
            </div>
            <div className="text-emerald-400 font-bold text-sm">
              {summary.estimated_total_cost}
            </div>
          </div>
        )}

        {summary.best_time_to_visit && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="text-slate-400 font-semibold mb-1 flex items-center">
              <Sun className="w-3.5 h-3.5 mr-1 text-amber-400" />
              Best Season to Visit:
            </div>
            <div className="text-slate-200 font-medium">
              {summary.best_time_to_visit}
            </div>
          </div>
        )}

        {summary.local_transportation_advice && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="text-slate-400 font-semibold mb-1 flex items-center">
              <Bus className="w-3.5 h-3.5 mr-1 text-sky-400" />
              Transit Advice:
            </div>
            <div className="text-slate-200 font-medium">
              {summary.local_transportation_advice}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-400">
          Ready to embark on your adventure? Export or save your customized plan below.
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            <span>Print View</span>
          </button>
        </div>
      </div>
    </div>
  );
}

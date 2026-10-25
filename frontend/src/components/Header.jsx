import React from 'react';
import { Compass, Sparkles, Key, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ apiStatus, onOpenKeyModal, customKeyPresent }) {
  const isConfigured = apiStatus?.api_key_configured || customKeyPresent;

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                WanderPlan <span className="text-teal-600">AI</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                <Sparkles className="w-3 h-3 mr-1 text-teal-500" />
                Gemini 2.5
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Intelligent Personalized Day-by-Day Travel Planner
            </p>
          </div>
        </div>

        {/* Right side status & API key configuration */}
        <div className="flex items-center space-x-3">
          {/* Status pill */}
          <div
            className={`hidden md:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
              isConfigured
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                : 'bg-amber-50 text-amber-800 border-amber-200/80'
            }`}
          >
            {isConfigured ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span>Gemini API Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                <span>Demo Preview Mode</span>
              </>
            )}
          </div>

          {/* Key settings button */}
          <button
            onClick={onOpenKeyModal}
            type="button"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            <span className="hidden sm:inline">API Key</span>
            {customKeyPresent && (
              <span className="ml-1.5 w-2 h-2 rounded-full bg-teal-500"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

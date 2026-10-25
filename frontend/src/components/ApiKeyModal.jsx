import React, { useState } from 'react';
import { X, Key, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, apiStatus, customKey, onSaveCustomKey }) {
  const [inputKey, setInputKey] = useState(customKey || '');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveCustomKey(inputKey.trim());
    onClose();
  };

  const handleClear = () => {
    setInputKey('');
    onSaveCustomKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Gemini API Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Server status card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-semibold text-slate-800">Backend Server Status:</span>
                <p className="text-xs text-slate-500 mt-0.5">Model: {apiStatus?.active_model || 'gemini-2.5-flash'}</p>
              </div>
              {apiStatus?.api_key_configured ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Key Loaded in .env
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  No .env Key
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client API Key Override (Optional)
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono"
              />
              <p className="text-xs text-slate-500 mt-1">
                You can set <code className="bg-slate-100 px-1 py-0.5 rounded">GEMINI_API_KEY</code> in <code className="bg-slate-100 px-1 py-0.5 rounded">backend/.env</code> or enter a temporary session key here.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline"
              >
                <span>Get a free key from Google AI Studio</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            <div className="pt-3 flex space-x-2">
              {customKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
                >
                  Clear Key
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

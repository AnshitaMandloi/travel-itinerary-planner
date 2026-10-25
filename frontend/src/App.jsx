import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import Header from './components/Header';
import PreferencesForm from './components/PreferencesForm';
import ItineraryView from './components/ItineraryView';
import LoadingState from './components/LoadingState';
import ApiKeyModal from './components/ApiKeyModal';
import { getApiStatus, getSamplePreferences, generateItinerary } from './services/api';

export default function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [samplePresets, setSamplePresets] = useState([]);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('wanderplan_gemini_key') || '');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDestination, setLoadingDestination] = useState('');
  const [itineraryResult, setItineraryResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function init() {
      const [status, presets] = await Promise.all([
        getApiStatus(),
        getSamplePreferences(),
      ]);
      setApiStatus(status);
      setSamplePresets(presets);
    }
    init();
  }, []);

  const handleSaveCustomKey = (newKey) => {
    setCustomKey(newKey);
    if (newKey) {
      localStorage.setItem('wanderplan_gemini_key', newKey);
    } else {
      localStorage.removeItem('wanderplan_gemini_key');
    }
  };

  const handleFormSubmit = async (preferences) => {
    setIsLoading(true);
    setLoadingDestination(preferences.destination);
    setErrorMessage(null);

    try {
      const response = await generateItinerary(preferences, customKey);
      setItineraryResult(response);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the itinerary backend. Ensure the FastAPI server is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setItineraryResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Navbar Header */}
      <Header
        apiStatus={apiStatus}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        customKeyPresent={Boolean(customKey)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero section (only visible when no itinerary is loaded and not loading) */}
        {!itineraryResult && !isLoading && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Personalized AI Travel Engine</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              Where will your curiosity take you?
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tell us your destination, travel party, and passions. Our Gemini-powered planner
              designs an optimized, day-by-day travel itinerary with authentic meals, transit tips, and insider spots.
            </p>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Generation Error</p>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
              </div>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold text-rose-600 hover:text-rose-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dynamic Content Views */}
        {isLoading ? (
          <LoadingState destination={loadingDestination} />
        ) : itineraryResult ? (
          <ItineraryView
            itineraryData={itineraryResult.data}
            isMock={itineraryResult.is_mock}
            notice={itineraryResult.notice}
            onReset={handleReset}
          />
        ) : (
          <PreferencesForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            samplePresets={samplePresets}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-700">WanderPlan AI Boilerplate</span>
            <span>&bull;</span>
            <span>FastAPI + Gemini 2.5 + React (Vite + Tailwind)</span>
          </div>
          <div>
            Built with Google GenAI SDK &bull; Structured JSON Schema
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiStatus={apiStatus}
        customKey={customKey}
        onSaveCustomKey={handleSaveCustomKey}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, MapPin, Coffee, UtensilsCrossed, Luggage } from 'lucide-react';

const LOADING_STEPS = [
  { icon: Compass, text: 'Consulting Google Gemini 2.5 AI...' },
  { icon: MapPin, text: 'Mapping geographical neighborhoods to minimize travel time...' },
  { icon: Coffee, text: 'Curating authentic morning, afternoon & evening activities...' },
  { icon: UtensilsCrossed, text: 'Matching local dining spots to your budget & dietary preferences...' },
  { icon: Luggage, text: 'Assembling essential packing checklist & local insider tips...' },
];

export default function LoadingState({ destination }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % LOADING_STEPS.STEP_COUNT || (prev + 1) % LOADING_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = LOADING_STEPS[currentStepIndex].icon;

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-xl shadow-slate-200/50 border border-slate-100 text-center max-w-xl mx-auto my-8">
      {/* Animated icon ring */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
          <CurrentIcon className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
        Crafting Your Itinerary
      </h3>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        Tailoring a personalized journey for <span className="text-teal-700 font-bold">{destination || 'your destination'}</span>
      </p>

      {/* Dynamic step ticker */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-teal-500" />
        <span>{LOADING_STEPS[currentStepIndex].text}</span>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center space-x-1.5 mt-8">
        {LOADING_STEPS.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentStepIndex ? 'w-6 bg-teal-600' : 'w-2 bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

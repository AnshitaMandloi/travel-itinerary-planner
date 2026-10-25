import React, { useState } from 'react';
import { AlertCircle, Calendar, Sparkles } from 'lucide-react';
import TripSummaryCard from './TripSummaryCard';
import DayCard from './DayCard';
import PackingList from './PackingList';
import TravelTips from './TravelTips';

export default function ItineraryView({ itineraryData, isMock, notice, onReset }) {
  const [selectedDay, setSelectedDay] = useState('all');

  if (!itineraryData) return null;

  const { trip_summary, days = [], packing_checklist = [], general_travel_tips = [] } = itineraryData;

  const displayedDays = selectedDay === 'all'
    ? days
    : days.filter((d) => d.day_number === Number(selectedDay));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Notice banner for mock/demo mode */}
      {isMock && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Demo Mode Notice: </span>
            <span>
              {notice || "You're viewing a high-fidelity sample itinerary. Configure your GEMINI_API_KEY to unlock live Gemini 2.5 Flash generation."}
            </span>
          </div>
        </div>
      )}

      {/* Hero Trip Summary Card */}
      <TripSummaryCard
        summary={trip_summary}
        fullItinerary={itineraryData}
        onReset={onReset}
      />

      {/* Day Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedDay === 'all'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Days ({days.length})
        </button>

        {days.map((day) => (
          <button
            key={day.day_number}
            onClick={() => setSelectedDay(day.day_number)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDay === day.day_number
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Day {day.day_number}
          </button>
        ))}
      </div>

      {/* Render Days */}
      <div className="space-y-6">
        {displayedDays.map((day) => (
          <DayCard key={day.day_number} day={day} />
        ))}
      </div>

      {/* Packing Checklist */}
      {packing_checklist.length > 0 && (
        <PackingList packingChecklist={packing_checklist} />
      )}

      {/* Practical Travel Tips */}
      {general_travel_tips.length > 0 && (
        <TravelTips tips={general_travel_tips} />
      )}
    </div>
  );
}

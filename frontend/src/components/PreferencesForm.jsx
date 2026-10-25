import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Zap, 
  Sparkles, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Utensils, 
  Accessibility, 
  FileText 
} from 'lucide-react';

const POPULAR_DESTINATIONS = [
  'Kyoto, Japan',
  'Paris, France',
  'Banff, Canada',
  'Amalfi Coast, Italy',
  'Tokyo, Japan',
  'Barcelona, Spain',
  'Reykjavik, Iceland',
];

const AVAILABLE_INTERESTS = [
  { id: 'Culture & History', label: 'Culture & History', emoji: '⛩️' },
  { id: 'Local Food', label: 'Local Food & Markets', emoji: '🍜' },
  { id: 'Nature & Parks', label: 'Nature & Parks', emoji: '🌲' },
  { id: 'Photography', label: 'Photography Spots', emoji: '📸' },
  { id: 'Art & Museums', label: 'Art & Museums', emoji: '🎨' },
  { id: 'Outdoor Adventure', label: 'Outdoor Adventure', emoji: '🧗' },
  { id: 'Shopping & Boutiques', label: 'Shopping & Artisans', emoji: '🛍️' },
  { id: 'Nightlife & Bars', label: 'Nightlife & Lounges', emoji: '🍸' },
  { id: 'Relaxation & Wellness', label: 'Relaxation & Spa', emoji: '🧘' },
  { id: 'Hidden Gems', label: 'Hidden Gems & Off-Path', emoji: '✨' },
];

export default function PreferencesForm({ onSubmit, isLoading, samplePresets = [] }) {
  const [destination, setDestination] = useState('Kyoto, Japan');
  const [durationDays, setDurationDays] = useState(3);
  const [startDate, setStartDate] = useState('');
  const [travelParty, setTravelParty] = useState('Couple');
  const [budget, setBudget] = useState('Moderate');
  const [pace, setPace] = useState('Balanced');
  const [interests, setInterests] = useState(['Culture & History', 'Local Food', 'Nature & Parks']);
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleInterest = (interestId) => {
    setInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    );
  };

  const loadPreset = (preset) => {
    setDestination(preset.destination);
    setDurationDays(preset.duration_days);
    setStartDate(preset.start_date || '');
    setTravelParty(preset.travel_party);
    setBudget(preset.budget);
    setPace(preset.pace);
    setInterests(preset.interests || []);
    setDietaryPreferences(preset.dietary_preferences || '');
    setAccessibilityNeeds(preset.accessibility_needs || '');
    setCustomNotes(preset.custom_notes || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    onSubmit({
      destination: destination.trim(),
      duration_days: Number(durationDays),
      start_date: startDate || undefined,
      travel_party: travelParty,
      budget,
      pace,
      interests,
      dietary_preferences: dietaryPreferences.trim() || undefined,
      accessibility_needs: accessibilityNeeds.trim() || undefined,
      custom_notes: customNotes.trim() || undefined,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
      {/* Sample Presets Bar */}
      {samplePresets.length > 0 && (
        <div className="mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quick-Start Presets:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadPreset(preset)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200/80 hover:border-teal-200 transition-all"
              >
                {preset.label || preset.destination}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination & Quick Picks */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Where are you going?</span>
            </span>
            <span className="text-xs font-normal text-slate-400">City, region, or country</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-900 font-medium placeholder:text-slate-400 shadow-sm"
            />
            <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Quick chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-slate-400 mr-1">Popular:</span>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setDestination(dest)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60 transition-colors"
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Duration & Start Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Trip Duration</span>
              </span>
              <span className="text-sm font-extrabold text-teal-600">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="14"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Day</span>
              <span>7 Days</span>
              <span>14 Days</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Start Date (Optional)</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Travel Party & Budget Tier */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Who is Traveling?</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Solo', 'Couple', 'Family', 'Friends'].map((party) => (
                <button
                  key={party}
                  type="button"
                  onClick={() => setTravelParty(party)}
                  className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all ${
                    travelParty === party
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {party}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span>Budget Tier</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Budget $', value: 'Budget' },
                { label: 'Moderate $$', value: 'Moderate' },
                { label: 'Luxury $$$', value: 'Luxury' },
              ].map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBudget(b.value)}
                  className={`py-2 px-1 text-center text-xs font-semibold rounded-xl border transition-all ${
                    budget === b.value
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pace */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>Itinerary Pace</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Relaxed', label: 'Relaxed', desc: 'Slow mornings & leisure' },
              { id: 'Balanced', label: 'Balanced', desc: 'Curated mix of highlights' },
              { id: 'Fast-paced', label: 'Fast-paced', desc: 'See everything possible' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPace(p.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  pace === p.id
                    ? 'bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold">{p.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Interests Multi-Select Chips */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>Interests & Vibes</span>
            </span>
            <span className="text-xs text-slate-400">Select all that apply</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map((item) => {
              const active = interests.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    active
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Accordion for Dietary, Accessibility & Custom Notes */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-teal-600" />
              <span>Dietary, Accessibility & Custom Notes (Optional)</span>
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {showAdvanced && (
            <div className="p-4 bg-white space-y-4 border-t border-slate-200 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <Utensils className="w-3.5 h-3.5 text-teal-600" />
                  <span>Dietary Preferences / Restrictions</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian, Halal, Seafood enthusiast, Loves specialty cafes"
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-teal-600" />
                  <span>Accessibility & Mobility</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Step-free access, gentle walking only, traveling with stroller"
                  value={accessibilityNeeds}
                  onChange={(e) => setAccessibilityNeeds(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>Special Requests & Bucket List Spots</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Must visit an authentic onsen, prefer early mornings to beat tourists"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-base shadow-lg shadow-teal-600/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5 text-teal-200 animate-pulse" />
          <span>{isLoading ? 'Designing Your Itinerary...' : 'Generate Personalized Itinerary'}</span>
        </button>
      </form>
    </div>
  );
}

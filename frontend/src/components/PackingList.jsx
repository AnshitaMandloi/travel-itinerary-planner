import React, { useState } from 'react';
import { Luggage, CheckSquare, Square, CheckCircle2 } from 'lucide-react';

export default function PackingList({ packingChecklist = [] }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalItems = packingChecklist.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
  const packedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md shadow-slate-100 border border-slate-200/80 mb-8">
      {/* Header & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-teal-50 rounded-xl text-teal-600">
            <Luggage className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Interactive Packing Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Check off essentials as you pack for your trip
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-700">
            {packedCount} of {totalItems} Packed ({progressPercent}%)
          </span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {packingChecklist.map((category, catIdx) => (
          <div key={catIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              {category.category}
            </h4>
            <ul className="space-y-2">
              {category.items && category.items.map((item, itemIdx) => {
                const isChecked = !!checkedItems[`${catIdx}-${itemIdx}`];
                return (
                  <li
                    key={itemIdx}
                    onClick={() => toggleItem(catIdx, itemIdx)}
                    className="flex items-start space-x-2 text-xs text-slate-700 cursor-pointer select-none group"
                  >
                    <button type="button" className="shrink-0 mt-0.5 text-teal-600">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 fill-teal-50" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      )}
                    </button>
                    <span className={`leading-relaxed transition-all ${
                      isChecked ? 'line-through text-slate-400 font-normal' : 'font-medium'
                    }`}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import Header from './components/Header';
import HousingChart from './components/HousingChart';
import EconomyChart from './components/EconomyChart';
import CostChart from './components/CostChart';
import PopulationChart from './components/PopulationChart';

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState(1);
  const [appliedPopMemberId, setAppliedPopMemberId] = useState(1);
  const [appliedCostMemberId, setAppliedCostMemberId] = useState();

  // Safe default to avoid runtime errors when data hasn't loaded yet.
  // Replace this with real fetched/imported data later.
  const cityData = {
    housing: [],
    economy: [],
  };

  const members_population = [
    { memberId: 1, memberNameEn: "Canada" },
    { memberId: 2, memberNameEn: "Newfoundland and Labrador" },
    { memberId: 3, memberNameEn: "Prince Edward Island" },
    { memberId: 4, memberNameEn: "Nova Scotia" },
    { memberId: 5, memberNameEn: "New Brunswick" },
    { memberId: 6, memberNameEn: "Quebec" },
    { memberId: 7, memberNameEn: "Ontario" },
    { memberId: 8, memberNameEn: "Manitoba" },
    { memberId: 9, memberNameEn: "Saskatchewan" },
    { memberId: 10, memberNameEn: "Alberta" },
    { memberId: 11, memberNameEn: "British Columbia" },
    { memberId: 12, memberNameEn: "Yukon" },
    { memberId: 13, memberNameEn: "Northwest Territories including Nunavut", terminated: 1 },
    { memberId: 14, memberNameEn: "Northwest Territories" },
    { memberId: 15, memberNameEn: "Nunavut" },
  ];

  const members_cost = [
    { memberId: 2, memberNameEn: "Canada" },
    { memberId: 3, memberNameEn: "Newfoundland and Labrador" },
    { memberId: 5, memberNameEn: "Prince Edward Island" },
    { memberId: 7, memberNameEn: "Nova Scotia" },
    { memberId: 9, memberNameEn: "New Brunswick" },
    { memberId: 11, memberNameEn: "Quebec" },
    { memberId: 14, memberNameEn: "Ontario" },
    { memberId: 18, memberNameEn: "Manitoba" },
    { memberId: 20, memberNameEn: "Saskatchewan" },
    { memberId: 23, memberNameEn: "Alberta" },
    { memberId: 26, memberNameEn: "British Columbia" },
    { memberId: 29, memberNameEn: "Yukon" },
    { memberId: 30, memberNameEn: "Northwest Territories" },
    { memberId: 31, memberNameEn: "Nunavut" },
  ];

  return (
    <div className="app-root min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="app-main flex-1 w-full px-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 h-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
          <aside className="space-y-4 md:col-span-1 h-full">
            <div className="p-3 rounded-lg bg-neutral-800/60 mt-3">
              <h2 className="text-xs font-semibold text-gray-300">Geography</h2>
              <div className="mt-2 flex gap-2">
                <select
                  className="w-full rounded-md bg-gray-800 border border-gray-700 p-1 text-sm text-white"
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                >
                  {members_population.filter((m) => !m.terminated).map((m) => (
                    <option key={m.memberId} value={m.memberId} className="bg-gray-800">
                      {m.memberNameEn}
                    </option>
                  ))}
                </select>
                <button
                  className="px-2 py-1 rounded bg-emerald-600 text-white"
                  onClick={() => {
                    setAppliedPopMemberId(selectedMemberId);
                    const pop = members_population.find(m => m.memberId === selectedMemberId);
                    const costMatch = pop ? members_cost.find(c => c.memberNameEn === pop.memberNameEn) : undefined;
                    setAppliedCostMemberId(costMatch ? costMatch.memberId : undefined);
                  }}
                >
                  Show
                </button>
              </div>
            </div>
          </aside>

          <section className="md:col-span-3 h-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
              <div style={{ gridRow: 'span 2' }}>
                <HousingChart data={cityData.housing} />
              </div>

              <div style={{ gridRow: 'span 2', minHeight: 240 }}>
                <EconomyChart data={cityData.economy} />
              </div>

              <div style={{ gridRow: 'span 2', minHeight: 240 }}>
                <CostChart memberId={appliedCostMemberId} />
              </div>

              <div style={{ gridRow: 'span 2' }}>
                <PopulationChart memberId={appliedPopMemberId} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

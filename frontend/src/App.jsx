import { useState } from 'react';
import Header from './components/Header';
import HousingChart from './components/HousingChart';
import LaborChart from './components/LaborChart';
import CostChart from './components/CostChart';
import PopulationChart from './components/PopulationChart';

function App() {
  const [selectedMemberId, setSelectedMemberId] = useState(1);
  const [appliedPopMemberId, setAppliedPopMemberId] = useState(1);
  const [appliedCostMemberId, setAppliedCostMemberId] = useState(null);
  const [appliedLaborMemberId, setAppliedLaborMemberId] = useState(null);
  const [appliedHousingMemberId, setAppliedHousingMemberId] = useState(null);

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

  const members_labor = [
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
  ];

  const member_housing = [
    { memberId: 1, memberNameEn: "Canada" },
    { memberId: 3, memberNameEn: "Newfoundland and Labrador" },
    { memberId: 5, memberNameEn: "Prince Edward Island" },
    { memberId: 7, memberNameEn: "Nova Scotia" },
    { memberId: 9, memberNameEn: "New Brunswick" },
    { memberId: 11, memberNameEn: "Quebec" },
    { memberId: 17, memberNameEn: "Ontario" },
    { memberId: 29, memberNameEn: "Manitoba" },
    { memberId: 31, memberNameEn: "Saskatchewan" },
    { memberId: 34, memberNameEn: "Alberta" },
    { memberId: 37, memberNameEn: "British Columbia" },
  ];

  const appliedProvince = members_population.find(
    m => m.memberId === appliedPopMemberId
  );

  return (
    <div className="app-root min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans">
      <Header />

      <main className="app-main flex-1 w-full px-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 h-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
          <aside className="space-y-4 md:col-span-1 h-full">
            <div className="p-4 mt-3 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <h2 className="text-xs font-semibold text-[var(--muted)]">Province</h2>
              <div className="mt-2 flex gap-2">
                <select
                  className="w-full bg-[var(--surface)] border border-[var(--border)] p-2 text-sm text-[var(--text)]"
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(Number(e.target.value))}
                >
                  {members_population.map((p) => (
                    <option
                      key={p.memberId}
                      value={p.memberId}
                      style={{
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text)',
                      }}
                    >
                      {p.memberNameEn}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 bg-[var(--accent)] text-white hover:opacity-90"
                  onClick={() => {
                    const selectedPopMember = members_population.find(
                      m => m.memberId === selectedMemberId
                    );
                    if (!selectedPopMember) return;

                    const name = selectedPopMember.memberNameEn;

                    const costMatch = members_cost.find(c => c.memberNameEn === name);
                    const laborMatch = members_labor.find(l => l.memberNameEn === name);
                    const housingMatch = member_housing.find(h => h.memberNameEn === name);

                    setAppliedPopMemberId(selectedPopMember.memberId);
                    setAppliedCostMemberId(costMatch?.memberId);
                    setAppliedLaborMemberId(laborMatch?.memberId);
                    setAppliedHousingMemberId(housingMatch?.memberId);
                  }}
                >
                  Show
                </button>
              </div>
              {appliedProvince && (
                <div className="p-3 mt-3 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                  <h2 className="text-xs font-semibold text-[var(--muted)]">Selected Province</h2>
                  <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                    {appliedProvince.memberNameEn}
                  </p>
                </div>
              )}
            </div>
          </aside>

          <section className="md:col-span-3 h-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
              <div style={{ gridRow: 'span 2' }}>
                <HousingChart memberId={appliedHousingMemberId} />
              </div>
              <div style={{ gridRow: 'span 2', minHeight: 240 }}>
                <LaborChart memberId={appliedLaborMemberId} />
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

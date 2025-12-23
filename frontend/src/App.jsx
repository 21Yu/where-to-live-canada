import { useState } from 'react';
import Header from './components/Header';
import HousingChart from './components/HousingChart';
import EconomyChart from './components/EconomyChart';
import CostChart from './components/CostChart';
import PopulationChart from './components/PopulationChart';

function App() {
  const cities = ['Toronto', 'Vancouver', 'Montreal'];
  const [city, setCity] = useState(cities[0]);

  const cityDatasets = {
    Toronto: {
      housing: [
        { period: '2019', priceIndex: 100, vacancy: 3.0 },
        { period: '2020', priceIndex: 105, vacancy: 2.6 },
        { period: '2021', priceIndex: 120, vacancy: 2.0 },
        { period: '2022', priceIndex: 140, vacancy: 1.8 },
        { period: '2023', priceIndex: 155, vacancy: 1.6 },
      ],
      cost: [
        { period: '2019', inflation: 2.0, groceries: 100 },
        { period: '2020', inflation: 1.0, groceries: 104 },
        { period: '2021', inflation: 3.5, groceries: 112 },
        { period: '2022', inflation: 7.0, groceries: 130 },
        { period: '2023', inflation: 4.2, groceries: 135 },
      ],
      economy: [
        { period: '2019', unemployment: 5.5, jobs: 130 },
        { period: '2020', unemployment: 9.0, jobs: 115 },
        { period: '2021', unemployment: 7.5, jobs: 125 },
        { period: '2022', unemployment: 6.0, jobs: 140 },
        { period: '2023', unemployment: 4.8, jobs: 150 },
      ],
      population: [
        { period: '2019', population: 2.93, netMigration: 0.08 },
        { period: '2020', population: 2.95, netMigration: 0.02 },
        { period: '2021', population: 2.98, netMigration: 0.06 },
        { period: '2022', population: 3.05, netMigration: 0.12 },
        { period: '2023', population: 3.15, netMigration: 0.10 },
      ],
    },
    Vancouver: {
      housing: [
        { period: '2019', priceIndex: 110, vacancy: 2.8 },
        { period: '2020', priceIndex: 112, vacancy: 2.5 },
        { period: '2021', priceIndex: 125, vacancy: 1.9 },
        { period: '2022', priceIndex: 145, vacancy: 1.5 },
        { period: '2023', priceIndex: 160, vacancy: 1.4 },
      ],
      cost: [
        { period: '2019', inflation: 1.8, groceries: 102 },
        { period: '2020', inflation: 0.9, groceries: 105 },
        { period: '2021', inflation: 3.2, groceries: 115 },
        { period: '2022', inflation: 6.5, groceries: 132 },
        { period: '2023', inflation: 3.8, groceries: 138 },
      ],
      economy: [
        { period: '2019', unemployment: 4.8, jobs: 90 },
        { period: '2020', unemployment: 8.5, jobs: 85 },
        { period: '2021', unemployment: 7.0, jobs: 88 },
        { period: '2022', unemployment: 5.8, jobs: 95 },
        { period: '2023', unemployment: 4.5, jobs: 100 },
      ],
      population: [
        { period: '2019', population: 2.47, netMigration: 0.06 },
        { period: '2020', population: 2.48, netMigration: -0.01 },
        { period: '2021', population: 2.50, netMigration: 0.03 },
        { period: '2022', population: 2.55, netMigration: 0.08 },
        { period: '2023', population: 2.60, netMigration: 0.07 },
      ],
    },
    Montreal: {
      housing: [
        { period: '2019', priceIndex: 90, vacancy: 3.5 },
        { period: '2020', priceIndex: 92, vacancy: 3.0 },
        { period: '2021', priceIndex: 105, vacancy: 2.4 },
        { period: '2022', priceIndex: 118, vacancy: 2.0 },
        { period: '2023', priceIndex: 128, vacancy: 1.9 },
      ],
      cost: [
        { period: '2019', inflation: 1.6, groceries: 98 },
        { period: '2020', inflation: 0.6, groceries: 100 },
        { period: '2021', inflation: 3.0, groceries: 108 },
        { period: '2022', inflation: 6.0, groceries: 122 },
        { period: '2023', inflation: 3.5, groceries: 126 },
      ],
      economy: [
        { period: '2019', unemployment: 6.0, jobs: 80 },
        { period: '2020', unemployment: 10.0, jobs: 75 },
        { period: '2021', unemployment: 8.2, jobs: 78 },
        { period: '2022', unemployment: 6.5, jobs: 85 },
        { period: '2023', unemployment: 5.2, jobs: 90 },
      ],
      population: [
        { period: '2019', population: 4.10, netMigration: 0.05 },
        { period: '2020', population: 4.12, netMigration: 0.00 },
        { period: '2021', population: 4.15, netMigration: 0.04 },
        { period: '2022', population: 4.18, netMigration: 0.09 },
        { period: '2023', population: 4.22, netMigration: 0.08 },
      ],
    },
  };

  const cityData = cityDatasets[city];

  return (
    <div className="app-root min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="app-main flex-1 w-full px-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 h-full" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
          <aside className="space-y-4 md:col-span-1 h-full">
            <div className="p-3 rounded-lg bg-neutral-800/60">
              <h2 className="text-xs font-semibold text-gray-300">City</h2>
              <select
                className="mt-2 w-full rounded-md bg-gray-800 border border-gray-700 p-1 text-sm text-white"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-lg bg-neutral-800/60">
              <h3 className="text-xs text-gray-300">Quick Snapshot</h3>
              <div className="mt-2 text-lg font-semibold">{city}</div>
              <div className="mt-1 text-sm text-gray-400">Population: {cityData.population.at(-1).population}M</div>
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
                <CostChart data={cityData.cost} />
              </div>

              <div style={{ gridRow: 'span 2' }}>
                <PopulationChart data={cityData.population} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

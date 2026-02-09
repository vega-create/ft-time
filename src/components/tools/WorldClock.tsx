import { useState, useEffect } from 'react';

const cities: [string,string][] = [
  ['New York','America/New_York'],['London','Europe/London'],['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],
  ['Paris','Europe/Paris'],['Dubai','Asia/Dubai'],['Singapore','Asia/Singapore'],['Los Angeles','America/Los_Angeles'],
  ['Chicago','America/Chicago'],['Berlin','Europe/Berlin'],['Hong Kong','Asia/Hong_Kong'],['Mumbai','Asia/Kolkata'],
  ['São Paulo','America/Sao_Paulo'],['Toronto','America/Toronto'],['Seoul','Asia/Seoul'],['Taipei','Asia/Taipei'],
];

export default function WorldClock() {
  const [now, setNow] = useState(new Date());
  const [selected, setSelected] = useState(cities.slice(0, 8).map(c => c[1]));

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const toggle = (tz: string) => setSelected(prev => prev.includes(tz) ? prev.filter(t => t !== tz) : [...prev, tz]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{cities.map(([name, tz]) => (
        <button key={tz} onClick={() => toggle(tz)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selected.includes(tz) ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600'}`}>{name}</button>
      ))}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cities.filter(([,tz]) => selected.includes(tz)).map(([name, tz]) => {
          const t = now.toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const d = now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });
          const h = +now.toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
          const isNight = h < 6 || h >= 20;
          return (
            <div key={tz} className={`rounded-xl p-4 ${isNight ? 'bg-gray-900 text-white' : 'bg-white border border-gray-100'}`}>
              <div className="text-sm text-gray-400 mb-1">{isNight ? '🌙' : '☀️'} {name}</div>
              <div className={`text-2xl font-mono font-bold ${isNight ? 'text-blue-300' : 'text-gray-900'}`}>{t}</div>
              <div className={`text-xs mt-1 ${isNight ? 'text-gray-500' : 'text-gray-400'}`}>{d}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

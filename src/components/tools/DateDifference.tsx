import { useState } from 'react';

export default function DateDifference() {
  const [d1, setD1] = useState('');
  const [d2, setD2] = useState('');
  const [result, setResult] = useState<{days:number;weeks:number;months:number;years:number;hours:number}|null>(null);

  const calc = () => {
    if (!d1 || !d2) return;
    const a = new Date(d1), b = new Date(d2);
    const diff = Math.abs(b.getTime() - a.getTime());
    const days = Math.floor(diff/86400000);
    let ym = Math.abs((b.getFullYear()-a.getFullYear())*12 + b.getMonth()-a.getMonth());
    setResult({days, weeks: Math.floor(days/7), months: ym, years: Math.floor(ym/12), hours: Math.floor(diff/3600000)});
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Start Date</label><input type="date" value={d1} onChange={e => setD1(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div><label className="text-xs text-gray-500">End Date</label><input type="date" value={d2} onChange={e => setD2(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <button onClick={calc} className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">📏 Calculate</button>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          {[['Days',result.days],['Weeks',result.weeks],['Months',result.months],['Years',result.years],['Hours',result.hours.toLocaleString()]].map(([l,v]) => (
            <div key={l as string} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">{v}</div><div className="text-xs text-gray-500">{l as string}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

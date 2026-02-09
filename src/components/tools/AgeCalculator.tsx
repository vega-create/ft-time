import { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{years:number;months:number;days:number;totalDays:number;nextBday:number}|null>(null);

  const calc = () => {
    if (!dob) return;
    const birth = new Date(dob), now = new Date();
    let y = now.getFullYear()-birth.getFullYear(), m = now.getMonth()-birth.getMonth(), d = now.getDate()-birth.getDate();
    if (d < 0) { m--; d += new Date(now.getFullYear(),now.getMonth(),0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const total = Math.floor((now.getTime()-birth.getTime())/(86400000));
    const next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (next <= now) next.setFullYear(next.getFullYear()+1);
    const daysUntil = Math.ceil((next.getTime()-now.getTime())/86400000);
    setResult({years:y,months:m,days:d,totalDays:total,nextBday:daysUntil});
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div><label className="text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none mt-1" /></div>
      <button onClick={calc} className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">🎂 Calculate Age</button>
      {result && (
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-blue-900">{result.years}</div>
            <div className="text-blue-600">years, {result.months} months, {result.days} days</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-gray-900">{result.totalDays.toLocaleString()}</div><div className="text-xs text-gray-500">Total days lived</div></div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-gray-900">{result.nextBday}</div><div className="text-xs text-gray-500">Days to next birthday</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';

function getWeek(d: Date): number {
  const t = new Date(d.getFullYear(), 0, 1);
  const day = t.getDay() || 7;
  if (day !== 1) t.setHours(-24 * (day - 1));
  return Math.ceil((((d.getTime() - t.getTime()) / 86400000) + 1) / 7);
}

export default function WeekNumber() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const d = new Date(date);
  const week = getWeek(d);
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(),0,0).getTime())/86400000);
  const quarter = Math.ceil((d.getMonth()+1)/3);
  const isLeap = (y: number) => y%4===0 && (y%100!==0 || y%400===0);
  const daysInYear = isLeap(d.getFullYear()) ? 366 : 365;

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-center text-lg" />
      <div className="bg-blue-900 rounded-2xl p-6 text-center text-white">
        <div className="text-6xl font-bold">W{week}</div>
        <div className="text-blue-200 mt-1">{d.toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['Day of Year',`${dayOfYear}/${daysInYear}`],['Quarter',`Q${quarter}`],['Leap Year',isLeap(d.getFullYear())?'Yes':'No'],['Day of Week',d.toLocaleDateString('en-US',{weekday:'long'})]].map(([l,v]) => (
          <div key={l} className="bg-white border border-gray-100 rounded-xl p-3 text-center"><div className="text-lg font-bold text-gray-900">{v}</div><div className="text-xs text-gray-500">{l}</div></div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';

const zones: [string,string][] = [['New York','America/New_York'],['London','Europe/London'],['Paris','Europe/Paris'],['Dubai','Asia/Dubai'],['Mumbai','Asia/Kolkata'],['Taipei','Asia/Taipei'],['Tokyo','Asia/Tokyo'],['Sydney','Australia/Sydney'],['LA','America/Los_Angeles'],['Chicago','America/Chicago']];

export default function MeetingPlanner() {
  const [selected, setSelected] = useState(['America/New_York','Europe/London','Asia/Taipei']);
  const toggle = (tz: string) => setSelected(prev => prev.includes(tz) ? prev.filter(t => t !== tz) : [...prev, tz]);

  const hours = Array.from({length:24}, (_,i) => i);
  const ref = new Date(); ref.setHours(0,0,0,0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{zones.map(([n,tz]) => (
        <button key={tz} onClick={() => toggle(tz)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${selected.includes(tz)?'bg-blue-900 text-white':'bg-gray-100 text-gray-600'}`}>{n}</button>
      ))}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr><th className="text-left px-2 py-1 text-gray-500">City</th>
            {hours.map(h => <th key={h} className="px-1 py-1 text-gray-400 w-8">{h}</th>)}
          </tr></thead>
          <tbody>
            {selected.map(tz => {
              const name = zones.find(z => z[1]===tz)?.[0] || tz;
              return (
                <tr key={tz}>
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap">{name}</td>
                  {hours.map(h => {
                    const d = new Date(ref); d.setHours(h);
                    const local = +d.toLocaleString('en-US',{timeZone:tz,hour:'numeric',hour12:false});
                    const work = local >= 9 && local < 18;
                    const sleep = local < 7 || local >= 23;
                    return <td key={h} className={`px-1 py-1 text-center rounded ${sleep?'bg-gray-800 text-gray-500':work?'bg-green-100 text-green-700':'bg-yellow-50 text-yellow-700'}`}>{local}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 rounded" /> Work hours</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-50 rounded border" /> Off hours</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-800 rounded" /> Sleep</span>
      </div>
    </div>
  );
}

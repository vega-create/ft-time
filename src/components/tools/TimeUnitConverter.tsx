import { useState } from 'react';

const units: [string,number][] = [['Milliseconds',0.001],['Seconds',1],['Minutes',60],['Hours',3600],['Days',86400],['Weeks',604800],['Months (30d)',2592000],['Years (365d)',31536000]];

export default function TimeUnitConverter() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState(3); // hours

  const baseSec = value * units[from][1];

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-2">
        <input type="number" value={value} onChange={e => setValue(+e.target.value)} className="w-32 px-3 py-3 border border-gray-200 rounded-xl text-center text-xl font-mono outline-none" />
        <select value={from} onChange={e => setFrom(+e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl">
          {units.map(([n],i) => <option key={n} value={i}>{n}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        {units.map(([name, factor], i) => {
          const converted = baseSec / factor;
          return (
            <div key={name} className={`flex justify-between items-center p-3 rounded-xl ${i===from?'bg-blue-900 text-white':'bg-white border border-gray-100'}`}>
              <span className={`text-sm ${i===from?'text-blue-200':'text-gray-600'}`}>{name}</span>
              <span className={`font-mono font-bold ${i===from?'text-white':'text-gray-900'}`}>{converted < 0.01 ? converted.toExponential(2) : converted.toLocaleString(undefined,{maximumFractionDigits:4})}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';

export default function CountdownTimer() {
  const [h, setH] = useState(0);
  const [m, setM] = useState(5);
  const [s, setS] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (running && remaining > 0) {
      ref.current = setInterval(() => setRemaining(p => { if (p <= 1) { setRunning(false); try { new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ==').play(); } catch {} return 0; } return p-1; }), 1000);
    }
    return () => clearInterval(ref.current);
  }, [running, remaining]);

  const start = () => { const total = h*3600+m*60+s; if (total > 0) { setRemaining(total); setRunning(true); }};
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setRemaining(0); };

  const rh = Math.floor(remaining/3600), rm = Math.floor((remaining%3600)/60), rs = remaining%60;
  const pct = (h*3600+m*60+s) > 0 ? remaining/(h*3600+m*60+s)*100 : 0;

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      {!running && remaining === 0 && (
        <div className="flex justify-center gap-3">
          {[['H',h,setH,23],['M',m,setM,59],['S',s,setS,59]].map(([l,v,fn,max]) => (
            <div key={l as string}><label className="text-xs text-gray-500">{l as string}</label>
              <input type="number" value={v as number} onChange={e => (fn as Function)(Math.max(0,Math.min(max as number,+e.target.value)))} className="w-20 px-3 py-3 border border-gray-200 rounded-xl text-center text-2xl font-mono" /></div>
          ))}
        </div>
      )}
      <div className="relative w-56 h-56 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1E3A5F" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${pct*2.83} 283`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-mono font-bold text-gray-900">{String(rh).padStart(2,'0')}:{String(rm).padStart(2,'0')}:{String(rs).padStart(2,'0')}</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        {!running && remaining === 0 && <button onClick={start} className="px-8 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">▶ Start</button>}
        {running && <button onClick={pause} className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-bold">⏸ Pause</button>}
        {!running && remaining > 0 && <button onClick={() => setRunning(true)} className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold">▶ Resume</button>}
        {remaining > 0 && <button onClick={reset} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold">⏹ Reset</button>}
      </div>
      <div className="flex justify-center gap-2">{[['1m',0,1,0],['5m',0,5,0],['10m',0,10,0],['25m',0,25,0],['1h',1,0,0]].map(([l,hh,mm,ss]) => (
        <button key={l as string} onClick={() => {setH(hh as number);setM(mm as number);setS(ss as number);}} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">{l as string}</button>
      ))}</div>
    </div>
  );
}

import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const ref = useRef<ReturnType<typeof setInterval>>();
  const startRef = useRef(0);

  const start = () => { startRef.current = Date.now() - ms; ref.current = setInterval(() => setMs(Date.now() - startRef.current), 10); setRunning(true); };
  const stop = () => { clearInterval(ref.current); setRunning(false); };
  const reset = () => { clearInterval(ref.current); setMs(0); setRunning(false); setLaps([]); };
  const lap = () => setLaps([...laps, ms]);

  const fmt = (t: number) => {
    const min = Math.floor(t/60000), sec = Math.floor((t%60000)/1000), cen = Math.floor((t%1000)/10);
    return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${String(cen).padStart(2,'0')}`;
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div className="text-6xl font-mono font-bold text-gray-900 py-8">{fmt(ms)}</div>
      <div className="flex justify-center gap-3">
        {!running ? <button onClick={start} className="px-8 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">{ms > 0 ? '▶ Resume' : '▶ Start'}</button>
          : <button onClick={stop} className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold">⏸ Stop</button>}
        {running && <button onClick={lap} className="px-8 py-3 bg-gray-700 text-white rounded-xl font-bold">🏁 Lap</button>}
        {ms > 0 && !running && <button onClick={reset} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold">⏹ Reset</button>}
      </div>
      {laps.length > 0 && (
        <div className="space-y-1 text-left">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between bg-white border border-gray-100 rounded-lg p-3 text-sm">
              <span className="text-gray-500">Lap {i+1}</span>
              <span className="font-mono font-bold">{fmt(l)}</span>
              {i > 0 && <span className="text-xs text-gray-400">+{fmt(l - laps[i-1])}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

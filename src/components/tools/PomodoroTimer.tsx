import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
  const [work, setWork] = useState(25);
  const [brk, setBrk] = useState(5);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => setRemaining(p => {
        if (p <= 1) { setRunning(false);
          if (!isBreak) { setSessions(s => s+1); setIsBreak(true); setRemaining(brk*60); } else { setIsBreak(false); setRemaining(work*60); }
          return isBreak ? work*60 : brk*60;
        } return p-1;
      }), 1000);
    }
    return () => clearInterval(ref.current);
  }, [running, isBreak, work, brk]);

  const mm = Math.floor(remaining/60), ss = remaining%60;

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div className={`text-sm font-medium px-4 py-2 rounded-full inline-block ${isBreak ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{isBreak ? '☕ Break' : '🍅 Focus'}</div>
      <div className="relative w-56 h-56 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={isBreak?'#10B981':'#1E3A5F'} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${remaining/((isBreak?brk:work)*60)*283} 283`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-5xl font-mono font-bold text-gray-900">{String(mm).padStart(2,'0')}:{String(ss).padStart(2,'0')}</span></div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning(!running)} className={`px-8 py-3 rounded-xl font-bold text-white ${running?'bg-yellow-500':'bg-blue-900'}`}>{running ? '⏸ Pause' : '▶ Start'}</button>
        <button onClick={() => {setRunning(false);setIsBreak(false);setRemaining(work*60);}} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold">⏹ Reset</button>
      </div>
      <div className="flex justify-center gap-4">
        <div><label className="text-xs text-gray-500">Work (min)</label><input type="number" value={work} onChange={e => {setWork(+e.target.value);if(!running&&!isBreak)setRemaining(+e.target.value*60);}} className="w-20 px-3 py-2 border rounded-lg text-center" /></div>
        <div><label className="text-xs text-gray-500">Break (min)</label><input type="number" value={brk} onChange={e => setBrk(+e.target.value)} className="w-20 px-3 py-2 border rounded-lg text-center" /></div>
      </div>
      <div className="text-sm text-gray-500">Sessions completed: <span className="font-bold text-blue-900">{sessions}</span></div>
    </div>
  );
}

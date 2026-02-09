import { useState, useEffect } from 'react';

export default function UnixTimestamp() {
  const [now, setNow] = useState(Math.floor(Date.now()/1000));
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'toDate'|'toUnix'>('toDate');

  useEffect(() => { const t = setInterval(() => setNow(Math.floor(Date.now()/1000)), 1000); return () => clearInterval(t); }, []);

  const convert = () => {
    if (mode === 'toDate') {
      const ts = +input; const d = new Date(ts > 1e12 ? ts : ts*1000);
      setResult(d.toString() === 'Invalid Date' ? 'Invalid timestamp' : d.toLocaleString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}));
    } else {
      const d = new Date(input);
      setResult(d.toString() === 'Invalid Date' ? 'Invalid date' : String(Math.floor(d.getTime()/1000)));
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="bg-gray-900 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-400 mb-1">Current Unix Timestamp</p>
        <p className="text-3xl font-mono font-bold text-green-400 cursor-pointer" onClick={() => navigator.clipboard.writeText(String(now))}>{now}</p>
      </div>
      <div className="flex gap-2">{(['toDate','toUnix'] as const).map(m => (
        <button key={m} onClick={() => {setMode(m);setResult('');}} className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${mode===m?'bg-blue-900 text-white':'bg-gray-100 text-gray-600'}`}>{m === 'toDate' ? 'Timestamp → Date' : 'Date → Timestamp'}</button>
      ))}</div>
      <input type={mode==='toDate'?'text':'datetime-local'} value={input} onChange={e => setInput(e.target.value)} placeholder={mode==='toDate'?'1700000000':'Select date'} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-mono outline-none" />
      <button onClick={convert} className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">Convert</button>
      {result && <div className="bg-blue-50 rounded-xl p-4 text-center font-mono text-blue-900 font-bold">{result}</div>}
    </div>
  );
}

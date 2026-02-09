import { useState } from 'react';

const zones: [string,string][] = [
  ['UTC','UTC'],['EST (New York)','America/New_York'],['CST (Chicago)','America/Chicago'],['MST (Denver)','America/Denver'],['PST (LA)','America/Los_Angeles'],
  ['GMT (London)','Europe/London'],['CET (Paris)','Europe/Paris'],['EET (Helsinki)','Europe/Helsinki'],['IST (Mumbai)','Asia/Kolkata'],
  ['CST (Taipei)','Asia/Taipei'],['JST (Tokyo)','Asia/Tokyo'],['KST (Seoul)','Asia/Seoul'],['AEST (Sydney)','Australia/Sydney'],['NZST (Auckland)','Pacific/Auckland'],
];

export default function TimezoneConverter() {
  const [from, setFrom] = useState('America/New_York');
  const [to, setTo] = useState('Asia/Taipei');
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 16));
  const [result, setResult] = useState('');

  const convert = () => {
    const fromTime = new Date(dateStr).toLocaleString('en-US', { timeZone: from });
    const d = new Date(fromTime);
    setResult(d.toLocaleString('en-US', { timeZone: to, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">From</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">{zones.map(([n,v]) => <option key={v} value={v}>{n}</option>)}</select></div>
        <div><label className="text-xs text-gray-500">To</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">{zones.map(([n,v]) => <option key={v} value={v}>{n}</option>)}</select></div>
      </div>
      <div><label className="text-xs text-gray-500">Date & Time</label>
        <input type="datetime-local" value={dateStr} onChange={e => setDateStr(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      <button onClick={convert} className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">🔄 Convert</button>
      {result && <div className="bg-blue-50 rounded-xl p-6 text-center"><p className="text-sm text-blue-600 mb-1">Converted Time</p><p className="text-2xl font-bold text-blue-900">{result}</p></div>}
    </div>
  );
}

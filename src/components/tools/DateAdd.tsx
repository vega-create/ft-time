import { useState } from 'react';

export default function DateAdd() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState(30);
  const [unit, setUnit] = useState<'days'|'weeks'|'months'|'years'>('days');
  const [op, setOp] = useState<'add'|'sub'>('add');
  const [result, setResult] = useState('');

  const calc = () => {
    const d = new Date(date);
    const val = op === 'add' ? amount : -amount;
    if (unit === 'days') d.setDate(d.getDate() + val);
    else if (unit === 'weeks') d.setDate(d.getDate() + val * 7);
    else if (unit === 'months') d.setMonth(d.getMonth() + val);
    else d.setFullYear(d.getFullYear() + val);
    setResult(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div><label className="text-xs text-gray-500">Start Date</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" /></div>
      <div className="flex gap-2">
        {(['add','sub'] as const).map(o => (
          <button key={o} onClick={() => setOp(o)} className={`px-4 py-2 rounded-lg text-sm font-medium ${op===o?'bg-blue-900 text-white':'bg-gray-100 text-gray-600'}`}>{o === 'add' ? '➕ Add' : '➖ Subtract'}</button>
        ))}
      </div>
      <div className="flex gap-3">
        <input type="number" value={amount} onChange={e => setAmount(Math.max(0,+e.target.value))} className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-center" />
        <div className="flex gap-1 flex-1">{(['days','weeks','months','years'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)} className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium ${unit===u?'bg-blue-900 text-white':'bg-gray-100 text-gray-600'}`}>{u}</button>
        ))}</div>
      </div>
      <button onClick={calc} className="w-full py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800">Calculate</button>
      {result && <div className="bg-blue-50 rounded-xl p-6 text-center"><p className="text-sm text-blue-600 mb-1">Result</p><p className="text-xl font-bold text-blue-900">{result}</p></div>}
    </div>
  );
}

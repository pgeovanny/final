import { useState } from 'react';

const bancas = ['FGV','Cespe','FCC','Verbena','Outra'];
const modos = ['Resumir','Esquematizar'];

export default function SelectOptions({ onNext }) {
  const [banca, setBanca] = useState('');
  const [modo, setModo] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Banca:</label>
        <select
          value={banca}
          onChange={e => setBanca(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Selecione --</option>
          {bancas.map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block mb-1">Modo:</label>
        <select
          value={modo}
          onChange={e => setModo(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Selecione --</option>
          {modos.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <button
        onClick={() => onNext({ banca, modo })}
        disabled={!banca || !modo}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Gerar Pré-visualização
      </button>
    </div>
);
}

export default function Preview({ text, onNext, onEdit }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">Pré-visualização:</label>
      <textarea
        value={text}
        onChange={e => onEdit(e.target.value)}
        rows={15}
        className="w-full border p-2 rounded font-mono text-sm"
      />
      <button
        onClick={onNext}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Aprovar e Exportar
      </button>
    </div>
);
}

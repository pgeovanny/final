export default function UploadQuestions({ onNext, setQuestionsText }) {
  const handle = async e => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/extract`,
      { method: 'POST', body: form }
    );
    const { text } = await res.json();
    setQuestionsText(text);
    onNext();
  };

  return (
    <div>
      <label className="block mb-2">Selecione o arquivo de questões (opcional):</label>
      <input type="file" accept=".txt,.csv,.docx" onChange={handle} />
      <button
        onClick={() => {
          setQuestionsText('');
          onNext();
        }}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Pular
      </button>
    </div>
);
}

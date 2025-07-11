export default function UploadLaw({ onNext, setLawText }) {
  const handle = async e => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append('file', file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/extract`,
      { method: 'POST', body: form }
    );
    const { text } = await res.json();
    setLawText(text);
    onNext();
  };

  return (
    <div>
      <label className="block mb-2">Selecione o PDF/DOCX da lei:</label>
      <input type="file" accept=".pdf,.docx" onChange={handle} />
    </div>
);
}

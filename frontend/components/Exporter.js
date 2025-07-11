import axios from 'axios';

export default function Exporter({ text }) {
  const handleDownload = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/export`,
      { processed_text: text },
      { responseType: 'blob' }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resumo_da_lei.pdf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="text-center">
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        Exportar PDF/DOCX Premium
      </button>
    </div>
);
}

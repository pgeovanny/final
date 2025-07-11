import { useState } from 'react';
import UploadLaw from './UploadLaw';
import UploadQuestions from './UploadQuestions';
import SelectOptions from './SelectOptions';
import Preview from './Preview';
import Exporter from './Exporter';

const steps = [
  'Enviar Lei',
  'Enviar Questões',
  'Escolher Opções',
  'Pré-visualização',
  'Exportar'
];

export default function Stepper() {
  const [current, setCurrent] = useState(0);
  const [lawText, setLawText] = useState('');
  const [questionsText, setQuestionsText] = useState('');
  const [options, setOptions] = useState({ banca: '', modo: '' });
  const [processed, setProcessed] = useState('');

  const next = () => setCurrent(i => Math.min(i + 1, steps.length - 1));
  const prev = () => setCurrent(i => Math.max(i - 1, 0));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex-1 text-center ${
              i === current ? 'font-bold text-blue-600' : 'text-gray-400'
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="min-h-[300px]">
        {current === 0 && (
          <UploadLaw onNext={next} setLawText={setLawText} />
        )}
        {current === 1 && (
          <UploadQuestions onNext={next} setQuestionsText={setQuestionsText} />
        )}
        {current === 2 && (
          <SelectOptions
            onNext={async opts => {
              setOptions(opts);
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/process`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    texto_base: lawText,
                    questoes_texto: questionsText,
                    ...opts
                  })
                }
              );
              const { processed_text } = await res.json();
              setProcessed(processed_text);
              next();
            }}
          />
        )}
        {current === 3 && (
          <Preview text={processed} onNext={next} onEdit={setProcessed} />
        )}
        {current === 4 && <Exporter text={processed} />}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={next}
          disabled={current === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
);
}

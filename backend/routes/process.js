import axios from 'axios';
import extractText from '../utils/extractText.js';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const ENDPOINT = process.env.GEMINI_ENDPOINT;

export default async function processRoute(req, res) {
  const { texto_base, questoes_texto, banca, modo } = req.body;
  let prompt = `Base: ${texto_base}\n`;
  if (questoes_texto) prompt += `Questões: ${questoes_texto}\n`;
  prompt += `Use estilo de banca ${banca}, modo ${modo}. Sem níveis ou cargos.`;
  if (modo === 'Esquematizar') prompt += ` Inclua quadros, marcadores e tabelas.`;

  try {
    const response = await axios.post(ENDPOINT, {
      prompt,
      max_output_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_KEY}`
      }
    });

    const processed_text = response.data.candidates?.[0]?.output || '';
    res.json({ processed_text });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao chamar Gemini AI' });
  }
}

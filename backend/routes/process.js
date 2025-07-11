import axios from 'axios';

export default async function processRoute(req, res) {
  const { texto_base, questoes_texto = '', banca, modo } = req.body;
  if (!texto_base || !banca || !modo)
    return res.status(400).json({ error: 'texto_base, banca e modo são obrigatórios' });

  let prompt = `
Você é um especialista em legislação e elaboração de resumos de alto nível.
Use o estilo de banca ${banca} para gerar um resumo focado, sem menção a níveis ou cargos.
O resumo deve incluir:
- Tabelas e quadros (HTML ou Markdown) para organizar informações.
- Grifos coloridos (use tags <mark>texto</mark>).
- Título “Gabarite – Versão Legislação”.
- Destaque de seções importantes.
`;

  prompt += `
Base da lei: ${texto_base}
`;
  if (questoes_texto) prompt += `Padrão de questões: ${questoes_texto}
`;
  prompt += `
Modo: ${modo === 'Esquematizar' ? 'Esquematizar (quadros, marcadores e tabelas)' : 'Resumir'}.`;

  try {
    const response = await axios.post(
      process.env.GEMINI_ENDPOINT,
      { prompt, max_output_tokens: 2000 },
      { headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        }
      }
    );

    const processed_text = response.data.candidates?.[0]?.output || '';
    res.json({ processed_text });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao chamar Gemini AI' });
  }
}

import axios from 'axios';
import Joi from 'joi';
import { logger } from '../logger.js';

const schema = Joi.object({
  texto_base: Joi.string().min(10).required(),
  questoes_texto: Joi.string().allow('', null),
  banca: Joi.string().required(),
  modo: Joi.string().valid('Resumir','Esquematizar').required(),
});

export default async function processRoute(req, res) {
  logger.info('Process route called', { body: req.body });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.message}` });
  }
  const { texto_base, questoes_texto, banca, modo } = value;
  let prompt = `
Você é um especialista em legislação e elaboração de resumos de alto nível.
Use o estilo de banca ${banca} para gerar um resumo focado, sem menção a níveis ou cargos.
O resumo deve incluir:
- Tabelas e quadros para organizar informações.
- Grifos coloridos (use tags <mark>texto</mark>).
- Título "Gabarite – Versão Legislação".
- Destaque de seções importantes.
`;
  prompt += `
Base da lei: ${texto_base}
`;
  if (questoes_texto) prompt += `Padrão de questões: ${questoes_texto}
`;
  prompt += `
Modo: ${modo}.`;

  try {
    const resp = await axios.post(process.env.GEMINI_ENDPOINT, {
      prompt,
      temperature: 0.7,
      max_output_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      }
    });
    const processed_text = resp.data.candidates?.[0]?.output || '';
    res.json({ processed_text });
  } catch (err) {
    logger.error('Error in processRoute', err);
    res.status(502).json({ message: 'Error calling AI service' });
  }
}

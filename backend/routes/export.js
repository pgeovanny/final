import puppeteer from 'puppeteer';
import Joi from 'joi';
import { logger } from '../logger.js';

const schema = Joi.object({
  processed_text: Joi.string().min(1).required()
});

export default async function exportRoute(req, res) {
  logger.info('Export route called');
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `Validation error: ${error.message}` });
  }
  const { processed_text } = value;
  const html = `
<!DOCTYPE html>
<html lang="pt-br">
<head><meta charset="UTF-8" /><style>
  body { font-family: Arial, sans-serif; margin: 40px; }
  header { display: flex; align-items: center; margin-bottom: 20px; }
  header img { height: 50px; margin-right: 20px; }
  h1 { flex-grow: 1; text-align: center; font-size: 24px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  table, th, td { border: 1px solid #444; }
  th, td { padding: 8px; }
  mark { background-color: #ffff00; }
</style></head>
<body>
  <header>
    <img src="https://seu-dominio.com/logo.png" alt="Logo Gabarite"/>
    <h1>Gabarite – Versão Legislação</h1>
  </header>
  ${processed_text}
</body>
</html>`;
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Gabarite-Versao-Legislacao.pdf"'
    });
    res.send(pdfBuffer);
  } catch (err) {
    logger.error('Error in exportRoute', err);
    res.status(500).json({ message: 'Error generating PDF' });
  }
}

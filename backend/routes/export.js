import puppeteer from 'puppeteer';

export default async function exportRoute(req, res) {
  const { processed_text } = req.body;
  if (!processed_text)
    return res.status(400).json({ error: 'processed_text é obrigatório' });

  const html = `
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          header { text-align: center; margin-bottom: 20px; }
          header img { height: 60px; }
          h1 { text-align: center; font-size: 24px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          table, th, td { border: 1px solid #333; }
          th, td { padding: 8px; }
          mark { background-color: yellow; }
        </style>
      </head>
      <body>
        <header>
          <img src="https://seu-dominio.com/logo.png" alt="Logo Gabarite"/>
        </header>
        <h1>Gabarite – Versão Legislação</h1>
        <div>${processed_text}</div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  res
    .status(200)
    .set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Gabarite-Versao-Legislacao.pdf"'
    })
    .send(pdfBuffer);
}

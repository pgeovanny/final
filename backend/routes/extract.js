import fetch from 'node-fetch';
import extractText from '../utils/extractText.js';

export default async function extractRoute(req, res) {
  try {
    let text;

    // Se veio um arquivo via FormData:
    if (req.file) {
      text = await extractText(req.file.buffer, req.file.mimetype);
    }
    // Se veio JSON com URL:
    else if (req.body.url) {
      const url = req.body.url;
      const resp = await fetch(url);
      const contentType = resp.headers.get('content-type');
      const buffer = await resp.buffer();

      if (contentType.includes('application/pdf'))
        text = await extractText(buffer, 'application/pdf');
      else
        text = buffer.toString('utf-8'); // texto HTML simples
    } else {
      return res.status(400).json({ error: 'Envie file ou url' });
    }

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha na extração' });
  }
}

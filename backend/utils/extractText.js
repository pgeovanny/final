import mammoth from 'mammoth';

export default async function extractText(fileBuffer, mimetype) {
  if (mimetype === 'application/pdf') {
    // Dynamic import to avoid loading test assets
    const { default: pdfParse } = await import('pdf-parse/lib/pdf-parse.js');
    const data = await pdfParse(fileBuffer);
    return data.text;
  } else {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }
}

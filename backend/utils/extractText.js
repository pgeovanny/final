import mammoth from 'mammoth';

export default async function extractText(buffer, mimetype) {
  if (mimetype === 'application/pdf') {
    const { default: pdfParse } = await import('pdf-parse/lib/pdf-parse.js');
    const data = await pdfParse(buffer);
    return data.text;
  } else {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
}

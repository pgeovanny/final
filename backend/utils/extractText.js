import mammoth from 'mammoth';

export default async function extractText(buffer, mimetype) {
  if (mimetype === 'application/pdf' || !mimetype) {
    const { default: pdfParse } = await import('pdf-parse/lib/pdf-parse.js');
    const data = await pdfParse(buffer);
    return data.text;
  } else if (mimetype.includes('wordprocessingml')) {
    const { value } = await mammoth.extractRawText({ buffer });
    return value;
  } else {
    return buffer.toString('utf8');
  }
}

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';

import extractRoute from './routes/extract.js';
import processRoute from './routes/process.js';
import exportRoute from './routes/export.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

// 1) Extrair texto (PDF/DOCX ou URL)
app.post('/api/extract', upload.single('file'), extractRoute);

// 2) Processar com IA
app.post('/api/process', processRoute);

// 3) Exportar PDF formatado
app.post('/api/export', exportRoute);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import processRoute from './routes/process.js';

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

// Rota principal de processamento
app.post('/api/process', upload.none(), processRoute);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));

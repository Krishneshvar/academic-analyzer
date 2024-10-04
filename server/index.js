import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.post('/run-algorithm', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const algorithm = req.body.algorithm;

  const algorithmMap = {
    'Decision Tree': 'DecisionTree.py',
    'ID3': 'ID3.py',
    'Random Forest': 'RandomForest.py',
    'Support Vector': 'SupportVector.py',
  };

  const selectedAlgorithm = algorithmMap[algorithm];
  if (!selectedAlgorithm) {
    return res.status(400).json({ message: 'Invalid algorithm selected' });
  }

  const pythonCommand = `python3 Algorithms/${selectedAlgorithm} "${filePath}"`;

  exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ message: 'Error running algorithm' });
    }

    const outputfile = selectedAlgorithm.slice(0, -3)
    const imagePath = path.join(__dirname, 'outputs', `${outputfile}_Final_Output.png`);

    if (!fs.existsSync(imagePath)) {
      return res.status(500).json({ message: 'Image file not generated' });
    }

    res.download(imagePath, 'result.png', (err) => {
      if (err) {
        console.error(`Error sending image file: ${err}`);
        return res.status(500).json({ message: 'Error sending PDF file' });
      }
    });
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});

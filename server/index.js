import express from 'express';
import multer from 'multer';
import path from 'path';
import { exec } from 'child_process';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const server_port = 3000;
const client_port = 5173;

const upload = multer({ dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of allowed origins
const allowedOrigins = [
  'http://192.168.81.220:5173',
  'http://192.168.81.224:5173',
  'http://192.168.81.222:5173',
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the incoming origin is in the list of allowed origins
      if (allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the request
      } else {
          callback(new Error('Not allowed by CORS')); // Deny the request
      }
  },
  methods: ['GET', 'POST'],
  credentials: true
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
    return res.status(400).json({ message: 'No algorithms or Invalid algorithm selected' });
  }

  const pythonCommand = `python3 Algorithms/${selectedAlgorithm} "${filePath}"`;

  exec(pythonCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python file: ${error}`);
      return res.status(500).json({ message: 'Error running algorithm' });
    }

    const outputfile = selectedAlgorithm.slice(0, -3)
    const imagePath = path.join(__dirname, 'outputs', `${outputfile}_Final_Output.png`);

    if (!fs.existsSync(imagePath)) {
      return res.status(500).json({ message: 'Image file not generated' });
    }

    res.download(imagePath, 'result.png', (err) => {
      if (err) {
        console.error(`Error sending image file to client: ${err}`);
        return res.status(500).json({ message: 'Error sending image file to client' });
      }
    });
  });
});

app.listen(server_port, () => {
  console.log(`Server is running on http://192.168.81.220:${server_port}`);
});

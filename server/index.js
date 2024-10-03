import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import fs from 'fs';
import cors from 'cors'

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.post('/run-algorithm', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  const algorithm = req.body.algorithm;

  // Replace this command with the actual command to run your Python script
  const pythonCommand = `python3 path/to/your/script.py "${filePath}"`; // Adjust the path accordingly

  exec(pythonCommand, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing Python script: ${error}`);
          return res.status(500).json({ message: 'Error running algorithm' });
      }

      // Assuming your Python script saves the PDF to a known location
      const pdfPath = path.join(__dirname, 'output', 'result.pdf'); // Adjust according to your script

      // Check if the PDF file exists
      if (!fs.existsSync(pdfPath)) {
          return res.status(500).json({ message: 'PDF file not generated' });
      }

      // Send the PDF file to the client
      res.download(pdfPath, 'result.pdf', (err) => {
          if (err) {
              console.error(`Error sending PDF file: ${err}`);
              return res.status(500).json({ message: 'Error sending PDF file' });
          }
      });
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

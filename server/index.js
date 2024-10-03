import express from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/run-algorithm', upload.single('file'), (req, res) => {
  const file = req.file;
  const algorithm = req.body.algorithm;

  // Build the command to run the Python script with the uploaded file
  const pythonScriptPath = path.join(__dirname, 'Algorithms', `${algorithm}.py`);
  const filePath = path.join(__dirname, file.path);

  // Enclose paths in quotes to handle spaces
  const command = `python3 "${pythonScriptPath}" "${filePath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ message: `Error running algorithm: ${error.message}` });
    }

    if (stderr) {
      console.error(`Script error: ${stderr}`);
      return res.status(500).json({ message: `Script error: ${stderr}` });
    }

    console.log(`Script output: ${stdout}`);
    return res.json({ message: `Algorithm ${algorithm} ran successfully on ${file.originalname}`, output: stdout });
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`);
});

const express = require("express");
const multer = require("multer");
const { PythonShell } = require("python-shell");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Route to handle code execution
app.post("/execute", upload.single("dataset"), async (req, res) => {
  const { code } = req.body;
  const datasetPath = req.file.path;

  // Save the code to a temporary Python file
  const codeFilePath = path.join(__dirname, "temp_code.py");
  fs.writeFileSync(codeFilePath, code);

  try {
    // Run the Python code with the dataset using PythonShell
    let options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      args: [datasetPath], // Pass dataset as an argument to the script
    };

    PythonShell.run(codeFilePath, options, function (err, results) {
      if (err) {
        console.error("Error running Python script:", err);
        return res.status(500).send({ error: err.message });
      }

      // Send the output back to the client
      res.send({ output: results.join("\n") });
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).send({ error: error.message });
  } finally {
    // Clean up temporary files (code and dataset)
    fs.unlinkSync(codeFilePath);
    fs.unlinkSync(datasetPath);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

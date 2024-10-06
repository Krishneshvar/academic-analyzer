# Student Academic Performance Analyzer

> Created using [Vite](https://vite.dev/) + [React JS](https://react.dev/).

> Customized specifically for a use case.

## About
The client side application offers four different algorithms for analyzing students' academic performance. Upload the dataset(.xlsx, .csv) of the students and run the analysis. An image will automatically download, which will contain the details of the analysis.

The 4 algorithms used for the prediction.
```
• ID3
• Decision Tree
• Random Forest
• Support Vector Machine (SVC)
```

## Prerequisites
[Git](https://git-scm.com/downloads)

[Node JS](https://nodejs.org/en/download/package-manager)

[Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (npm)

[Python](https://www.python.org/downloads/)

[Pillow](https://pypi.org/project/pillow/)

## Usage
<u> Step 1: </u>
> Clone the repository.
```bash
git clone https://github.com/Krishneshvar/online-code-editor.git
```

<u> Step 2: </u>
> Install the dependencies for both, the client and the server.
```bash
cd ./academic-analyzer/client
npm install

cd ../server
npm install
```

<u> Step 3: </u>
> Run the web server.
```bash
node index.js
```

<u> Step 4: </u>
> Run the client application.
```bash
cd ../client
npm run dev
```

<u> Step 5: </u>
> Type the below link in your browser and enter.
```bash
http://localhost:5173/
```

<u> Step 6: </u>
> Upload the dataset file (.xlsx or .csv) in any of the algorithm and run it. The image file generated with the analysis will automatically be downloaded as `result.png` in your `Downloads` folder.

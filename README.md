# Online Code Editor

A project that allows you to code on a browser based code editor ([Monaco editor](https://microsoft.github.io/monaco-editor/) for React). It is created using [Vite](https://vite.dev/) + [React JS](https://react.dev/).

> Customized specifically for a use case, for Python codes.

# PyLab

## About
The client side application of a custom Python editor, specifically used to predict student's academic performance, for those who don't have programming knowledge and wants to get the job done. It predicts based on previous tests, assignments and exams.

It provides 4 algorithms to be used for the prediction.
```
• Decision Tree
• Random Forest
• Support Vector Machine
• ID3
```

## Prerequisites
[Node JS](https://nodejs.org/en/download/package-manager)

[Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

reportlab library in python

## Usage
<u> Step 1: </u>
> Clone the repository.
```bash
git clone https://github.com/Krishneshvar/online-code-editor.git
```

<u> Step 2: </u>
> Install the dependencies for both, the client and the server.
```bash
cd ./online-code-editor/pylab
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
cd ../pylab
npm run dev
```

<u> Step 5: </u>
> Type the below link in your browser and enter.
```bash
http://localhost:5173/
```

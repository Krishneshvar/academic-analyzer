import './App.css';
import data from './Descriptions.json';
import Card from './components/Card/Card';

function App() {
  const currYear = new Date().getFullYear();
  const { siteDesc, algorithms } = data;

  return (
    <>
      <main>
        <header className="site-name">
          <h1> SAP </h1>
        </header>

        <div className="site-home">
          <div className="site-desc">
            <h1> {siteDesc.title} </h1>
            <p> {siteDesc.text} </p>
          </div>

          <div className="algorithms">
            {
              algorithms.map((algo, index) => (
                <Card key={index} algo={algo} />
              ))
            }
          </div>
        </div>

        <div className="footer">
          &copy; {currYear}
        </div>
      </main>
    </>
  );
}

export default App;

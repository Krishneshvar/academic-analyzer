import './App.css'

function App() {

  return (
    <>
    <main>
      <div className='site-name'>
        <h1> SAP </h1>
      </div>
      <div className="site-home">
        <div className="site-desc">
          <h1> Students Academic Performance </h1>
          <p>
            This application allows users to explore various machine learning models for CGPA prediction and classification. It showcases
            different algorithms, evaluates their performance, and presents insights into feature importance and predictions. Users can upload
            datasets and select different methods to predict CGPA or classify results based on performance metrics like accuracy, precision,
            recall, and more.
          </p>
        </div>
        <div className="algorithms">
          <div className="cards">
            <h1> ID3 </h1>
            <p>
              Implements the ID3 algorithm using a Decision Tree classifier to classify CGPA into Low, Medium, and High categories. Recursive
              feature elimination (RFE) is used to select the best features.
            </p>
            <div className="compile-btns">
              <button className="upload-btn"> Upload </button>
              <button className="run-btn"> Run </button>
            </div>
          </div>
          <div className="cards">
            <h1> ID3 </h1>
            <p>
              Implements the ID3 algorithm using a Decision Tree classifier to classify CGPA into Low, Medium, and High categories. Recursive
              feature elimination (RFE) is used to select the best features.
            </p>
            <div className="compile-btns">
              <button className="upload-btn"> Upload </button>
              <button className="run-btn"> Run </button>
            </div>
          </div>
          <div className="cards">
            <h1> ID3 </h1>
            <p>
              Implements the ID3 algorithm using a Decision Tree classifier to classify CGPA into Low, Medium, and High categories. Recursive
              feature elimination (RFE) is used to select the best features.
            </p>
            <div className="compile-btns">
              <button className="upload-btn"> Upload </button>
              <button className="run-btn"> Run </button>
            </div>
          </div>
          <div className="cards">
            <h1> ID3 </h1>
            <p>
              Implements the ID3 algorithm using a Decision Tree classifier to classify CGPA into Low, Medium, and High categories. Recursive
              feature elimination (RFE) is used to select the best features.
            </p>
            <div className="compile-btns">
              <button className="upload-btn"> Upload </button>
              <button className="run-btn"> Run </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        Hello
      </div>
    </main>
    </>
  )
}

export default App

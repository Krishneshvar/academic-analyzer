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
            <div className="card-content">
              <h1> ID3 </h1>
              <p>
                Implements the ID3 algorithm using a Decision Tree classifier to classify CGPA into Low, Medium, and High categories. Recursive
                feature elimination (RFE) is used to select the best features.
              </p>
            </div>
            <div className="compile-btns">
              <button className="upload-btn">
                Upload
                <span class="material-symbols-outlined"> upload_file </span>
              </button>
              <button className="run-btn">
                Run
                <span class="material-symbols-outlined"> play_circle </span>
              </button>
            </div>
          </div>
          <div className="cards">
            <div className="card-content">
              <h1> Decision Tree </h1>
              <p>
                Compares the performance of multiple models, including Random Forest, SVC, Decision Tree, and ID3. It evaluates them based on
                accuracy, precision, recall, and F2 score, using Recursive Feature Elimination (RFE) for feature selection.
              </p>
            </div>
            <div className="compile-btns">
              <button className="upload-btn">
                Upload
                <span class="material-symbols-outlined"> upload_file </span>
              </button>
              <button className="run-btn">
                Run
                <span class="material-symbols-outlined"> play_circle </span>
              </button>
            </div>
          </div>
          <div className="cards">
            <div className="card-content">
              <h1> Random Forest </h1>
              <p>
                Uses Random Forest to predict continuous CGPA values. It evaluates the model’s performance through mean squared error (MSE) and
                R² scores and visualizes feature importance.
              </p>
            </div>
            <div className="compile-btns">
              <button className="upload-btn">
                Upload
                <span class="material-symbols-outlined"> upload_file </span>
              </button>
              <button className="run-btn">
                Run
                <span class="material-symbols-outlined"> play_circle </span>
              </button>
            </div>
          </div>
          <div className="cards">
            <div className="card-content">
              <h1> SVC </h1>
              <p>
                A Support Vector Classifier (SVC) that classifies CGPA as pass or fail based on a threshold. Recursive feature elimination (RFE)
                helps select the top features to improve prediction accuracy.
              </p>
            </div>
            <div className="compile-btns">
              <button className="upload-btn">
                Upload
                <span class="material-symbols-outlined"> upload_file </span>
              </button>
              <button className="run-btn">
                Run
                <span class="material-symbols-outlined"> play_circle </span>
              </button>
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

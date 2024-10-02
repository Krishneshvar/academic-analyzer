import { Link } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <div className="algo-container">
      <div className="topic">
        Students Academic Success
      </div>
      <div className="algorithms">
        <div className="choices">
          <Link to={`/decision-tree`} style={{ textDecoration: 'none', color: 'white', textAlign: 'center' }}>
            <h1> Decision Tree </h1>
            <div className="choice-content">
              <img src="/decision-tree.png" alt="Decision Tree Logo" />
              <p>
                This code predicts student CGPA using a Decision Tree model and feature selection. It evaluates the model's performance 
                and visualizes the results.
              </p>
            </div>
          </Link>
        </div>
        <div className="choices">
          <Link to={`/random-forest`} style={{ textDecoration: 'none', color: 'white'}}>
            <h1> Random Forest </h1>
            <div className="choice-content">
              <img src="/random-forest.png" alt="Random Forest Classifier Logo" />
              <p>
                This code predicts student CGPA using a Random Forest Regression model. It evaluates the model's performance using 
                MSE and R^2, and visualizes the results.
              </p>
            </div>
          </Link>
        </div>
        <div className="choices">
          <Link to={`/support-vector`} style={{ textDecoration: 'none', color: 'white'}}>
            <h1> SVC </h1>
            <div className="choice-content">
              <img src="/support-vector.png" alt="Support Vector Classifier Logo" />
              <p>
                This Python code uses an SVC model to predict student passing status based on selected features. It evaluates the model's 
                performance using various metrics and visualizes the results.
              </p>
            </div>
          </Link>
        </div>
        <div className="choices">
          <Link to={`/id3`} style={{ textDecoration: 'none', color: 'white'}}>
            <h1> ID3 </h1>
            <div className="choice-content">
              <img src="/decision-tree.png" alt="ID3 Logo" />
              <p>
                This code performs machine learning classification to predict student pass/fail status based on CGPA. It uses multiple
                models (Random Forest, SVC, Decision Tree, ID3) and evaluates their performance using accuracy, precision, recall, and
                F2 score. Feature selection is done using RFE. The best model is identified based on the F2 score.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default App

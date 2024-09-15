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
      </div>
      <div className="compare">
        <Link to={`/comparison`} style={{ textDecoration: 'none', color: 'white'}}>
          <button className="compare-btn"> Compare </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default App

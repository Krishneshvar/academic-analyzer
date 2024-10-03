import './Card.css'

const Card = ({ algo }) => {
  return (
    <div className="cards">
      <div className="card-content">
        <h1> {algo.title} </h1>
        <p> {algo.description} </p>
      </div>
      <div className="compile-btns">
        <button className="upload-btn">
          Upload
          <span className="material-symbols-outlined"> upload_file</span>
        </button>
        <button className="run-btn">
          Run
          <span className="material-symbols-outlined"> play_circle </span>
        </button>
      </div>
    </div>
  );
};

export default Card;

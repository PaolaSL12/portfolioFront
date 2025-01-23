import React from 'react'
import "./Card.css";
import { Link } from 'react-router-dom';


const Card = ({project}) => {
    return (
        <div className="card-container">
        <Link to={`/project/${project._id}`}>
          <div className="card">
            <h2>{project.title}</h2>
          </div>
        </Link>
      </div>
      );
}

export default Card
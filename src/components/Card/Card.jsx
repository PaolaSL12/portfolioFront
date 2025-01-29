import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import ImgWrapper from "../ImgWrapper/ImgWrapper";

const Card = ({ project }) => {
  return (
    <div className="card-container">
      <Link to={`/projects/${project._id}`}>
        <div className="card">

            <ImgWrapper
              url={project.imageUrl}
              alt={project.title}
              c={"projectImg"}
              imgc={"imgCards"}
            />

          <div className="cardContent">
            <h2>{project.title}</h2>
            <p>{project.description[0].desc}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;

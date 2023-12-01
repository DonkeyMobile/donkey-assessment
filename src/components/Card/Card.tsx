import React from "react";
import "./card.css";

import { FaComment, FaComments, FaShareNodes } from "react-icons/fa6";

const church = require("../../assets/church.jpg");

type CardProps = {
  naam: string;
  subtitel: string;
  beschrijving: string;
};

function Card({ naam, subtitel, beschrijving }: CardProps) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="pic">
          <img src={church} alt="profile pic" />
        </div>
        <div className="info">
          <h1>{naam}</h1>
          <p>{subtitel}</p>
        </div>
      </div>
      <div className="text">
        <p>
          {beschrijving}
          <br />
          <br /> Donec quis quam diam.
        </p>
      </div>
      <div className="submenu">
        <ul>
          <li>
            <FaComment /> Reageer
          </li>
          <li>
            <FaComments /> 3 reacties
          </li>
          <li>
            <FaShareNodes /> Delen
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;

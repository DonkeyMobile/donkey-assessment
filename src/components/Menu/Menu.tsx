import React from "react";
import "./menu.css";
import {
  FaChurch,
  FaCalendarDays,
  FaHandHoldingHeart,
  FaPeopleGroup,
  FaRegCircleUser,
} from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  return (
    <div className="navcontainer">
      <div className="nav sticky">
        <h1>Menu</h1>
        <a href="https://www.donkeymobile.app/">
          <FaChurch /> Mijn kerk
        </a>
        <a href="https://www.donkeymobile.app/">
          <FaCalendarDays /> Agenda
        </a>
        <a href="https://www.donkeymobile.app/">
          <FaHandHoldingHeart /> Geven
        </a>
        <a href="https://www.donkeymobile.app/">
          <FaPeopleGroup /> Gemeente
        </a>
        <a href="https://www.donkeymobile.app/">
          <FaRegCircleUser /> Profiel
        </a>
        <a href="/"
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          <FaSignOutAlt /> Uitloggen
        </a>
      </div>
    </div>
  );
}

export default Menu;

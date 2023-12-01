import "./submenu.css";

const Church = require("../../assets/church.jpg");

function Submenu() {
  return (
    <div className="group-container">
      <div className="group">
        <div className="subpic border">
          <ul>
            <li>
              <img src={Church} alt="profile pic" />
              <h1>Mijn kerk</h1>
            </li>
            <li>
              <img src={Church} alt="profile pic" />
              <h1>Kookinspiratie</h1>
            </li>
            <li>
              <img src={Church} alt="profile pic" />
              <h1>Zomergroeten</h1>
            </li>
            <li>
              <img src={Church} alt="profile pic" />
              <h1>Gebedsgroep</h1>
            </li>
          </ul>
        </div>
        <div className="block-1">Ontdek</div>
        <div className="block-2">Schrijf bericht</div>
      </div>
    </div>
  );
}

export default Submenu;

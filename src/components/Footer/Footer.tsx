import React from "react";
import "./footer.css"

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>Copyright ⓒ {currentYear} - Donkey Mobile</p>
    </footer>
  );
}

export default Footer;
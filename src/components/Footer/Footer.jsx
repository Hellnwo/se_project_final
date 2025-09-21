import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import linkedin from "../../assets/linkedin.svg";
import github from "../../assets/github.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">© 2025 Supersite, Powered by News API</p>
      <div className="footer__section">
        <div className="footer__links">
          <Link to="/" className="footer__links-home">
            Home
          </Link>
          <a
            href="https://tripleten.com/"
            className="footer__links-tripleten"
            target="_blank"
          >
            Tripleten
          </a>
        </div>
        <div className="footer__links-icons">
          <a href="https://github.com/" className="footer__link-icons">
            <img src={github} alt="github icon" className="footer__link-icon" />
          </a>
          <a href="https://linkedin.com/" className="footer__link-icons">
            <img
              src={linkedin}
              alt="linkedin icon"
              className="footer__link-icons"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from "react";
import "./About.css";
import authorimage from "../../assets/authorimage.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <img src={authorimage} alt="author image" className="about__image" />
        <div>
        <h3 className="about__title">About the author</h3>
        <p className="about__caption">
          Hope E is the author, hoping to become a fullstack engineer after completing Tripleten's course. 
          They have learned all about HTML, CSS, Javascript 
          (and it's integrated libraries such as: React, Node, Vite, and Express), 
          and databases like MogoDB through Tripleten's curriculum. They have also learned
          about responsive web design, BEM methodology, Agile methodology, and Git(and all that may entail).
        </p>
        </div>
      </div>
    </section>
  );
}

export default About;

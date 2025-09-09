import React from "react";
import "./About.css";
import authorimage from "../../assets/authorimage";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <img src={authorimage} alt="author image" className="about__image" />
        <h3 className="about__title">About the author</h3>
        <p className="about__caption">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with TripleTen, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;

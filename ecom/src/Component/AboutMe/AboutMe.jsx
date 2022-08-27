import React from "react";
import "./AboutMe.css";
import illustrator from "./illustrator.png";
import edu from "./edu.png";
import developer from "./developer.png";
import mentor from "./mentor.png";
import ecomProject from "./ecomProject.jpg";
import collegeProject from "./collegeProject.jpg";
import blogProject from "./blogProject.jpg";

function AboutMe() {
  return (
    <div className="AboutMeContainer">
      <div>
        <h1 className="bigBio">Designer, Fullstack Developer & Mentor</h1>
        <p className="miniLine">
          I design and code beautifully simple things, and I love what I do.
        </p>
        <div className="imgAndHello">
          <img
            src={illustrator}
            alt="illustrator"
            height="700px"
            width="700px"
          />
          <div className="HelloContent">
            <h1>Hii, I'm Shiv. Nice to Meet You.</h1>
            <p>
              Since beginning my journey as a Fullstack Developer, I've done
              some Internship, remote Jobs and collobrate with amazing talented
              people to create a digital products for both business and consumer
              use. I'm quietly confident, naturally curious, and perpetually
              working on improving my chops one problem at a time.
            </p>
          </div>
        </div>
        <div className="skills">
          <div className="Educations">
            <img src={edu} alt="edu" className="imageDesignedu" />
            <p className="roleHeading">Education</p>
            <p className="roleDesc">
              I've Complete My B-tech Engineering in Computer Science to get
              good Knowlege of computers.
            </p>
            <p className="HeadingsOnBlocks">Things I've Hands on</p>
            <p className="actualTools">
              Cloud Tech, Machine Learning, Data Structures and Algorithm,
              Software Engineering and Other.
            </p>
            <p className="HeadingsOnBlocks">
              Achievements Through the Edu. Process
            </p>
            <p className="actualTools">
              I've cleared college with good SGPA.Have done some Certification
              cources. Got certified servel times for codong competions.
            </p>
          </div>
          <div className="FullstackDev">
            <img src={developer} alt="edu" className="imgDesignDev" />
            <p className="roleHeading">Fullstack Developer</p>
            <p className="roleDesc">
              I like to code things from scratch, and enjoy bringing ideas to
              life in the browser.
            </p>
            <p className="HeadingsOnBlocks">Languages I speak</p>
            <p className="actualTools">
              HTML, CSS, JavaScript, React, Node, Python, C, Databases (SQL,
              NOSQL).
            </p>
            <p className="HeadingsOnBlocks">Tools I'he Used</p>
            <p className="actualTools">
              VS Code, Diff. Terminals, Bootstrap, Material UI, Redux, Github,
              GIT. Can handle multiple OS.
            </p>
          </div>
          <div className="Mentor">
            <img src={mentor} alt="edu" className="imgDesignMentor" />
            <p className="roleHeading">Mentor</p>
            <p className="roleDesc">
              I genuinely care about people, and love helping fellow designers
              work on their craft.
            </p>
            <p className="HeadingsOnBlocks">Mentor Stats.</p>
            <p className="actualTools">
              Constantly Active On Stack Overflow, Forking and PR for people's
              project Help, Write on Medium about Tech to Help more.
            </p>
            <p className="HeadingsOnBlocks">One Can Find me on.</p>
            <p className="actualTools">
              Medium.com, Google Blogs, Git and LinkedIN. Emails are always a
              better way.
            </p>
          </div>
        </div>
        <div className="MyWork">
          <h1 className="bigBioWork">My Recent Work</h1>
          <p className="taglineProjects">
            Here are a few past design projects I've worked on. Want to see
            more? Email me.
          </p>
          <div className="projectHolder">
            <div>
              <img
                src={ecomProject}
                alt="projectImage"
                className="projectImage"
              />
              <p className="projectHeading">Ecommerce Webapp - Hecto</p>
            </div>
            <div>
              <img
                src={collegeProject}
                alt="projectImage"
                className="projectImage"
              />
              <p className="projectHeading">College management</p>
            </div>
            <div>
              <img
                src={blogProject}
                alt="projectImage"
                className="projectImage"
              />
              <p className="projectHeading">Blog Website</p>
            </div>
          </div>
        </div>
        <div className="collobration">
          <div className="StartProject">
            <h1>Start a Project</h1>
          </div>
          <div className="quote">
            <p>
              Interested in working together? We should queue up a time to chat.
              I'll buy the coffee.
            </p>
          </div>
          <div className="letDoButton">Let's Do This</div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

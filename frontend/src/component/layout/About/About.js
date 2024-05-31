import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/jk36236";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dweil4esn/image/upload/v1713332910/avatars/mzjllye1jxoml1epdwi5.jpg"  alt="Founder"
            />
            <Typography>Jatin Kumar</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit Github
            </Button>
            <span>
              This is a sample website made by @jatinkumar. Only with the
              purpose to learn MERN Stack and gain hands on experience.</span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow Me</Typography>
            <a
              href="https://twitter.com/JatinKalia15"
              target="blank"
            >
              <TwitterIcon className="TwitterSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/jatin-kumar-a78405184/" target="blank">
              <LinkedInIcon className="LinkedInSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";


const Contact = () => {
  return (
    <>
    <MetaData title="CONTACT" />
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:jatinkalia08@gmail.com">
        <Button>Contact: jatinkalia08@gmail.com</Button>
      </a>
    </div>
    </>
  );
};

export default Contact;
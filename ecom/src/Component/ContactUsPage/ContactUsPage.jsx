import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ContactUsPage.css";
import contactImg from "./contactImg.jpg";
import Sponsers from "../Sponsers/Sponsers";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Feature/FindUserSlice";
import { useEffect } from "react";

function ContactUsPage() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const { data } = useGetUserQuery(
    JSON.parse(localStorage.getItem("token")).userID
  );

  useEffect(() => {
    if (data) {
      setusername(data.username);
      setemail(data.email);
    }
  }, [data]);

  const sendMessage = () => {
    console.log(username, "username");
    console.log(email, "email");
    console.log(subject, "subject");
    console.log(message, "message");
  };

  return (
    <div className="contactUsContainer">
      <div className="contactud-row-1">
        <div className="aboutusdiv">
          <h1>Information About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
            neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
            tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
            vitae lobortis quis bibendum quam.
          </p>
          <div className="dotContainer">
            <span className="purpleCircle"></span>
            <span className="greenCircle"></span>
            <span className="blueCircle"></span>
          </div>
        </div>

        <div className="contactwaydiv">
          <h1>Contact Way</h1>

          <div className="deatlRowContainer">
            <div className="contactrow">
              <div className="detailHolderContact">
                <div>
                  <span className="purpleCircleBig"></span>
                </div>
                <div className="detailHolder">
                  <p>Tel : 0261-23356236</p>
                  <p>E-Mail : shop@gmail.com</p>
                </div>
              </div>
              <div className="detailHolderContact">
                <div>
                  <span className="pinkCircleBig"></span>
                </div>
                <div className="detailHolder">
                  <p>Support Forum</p>
                  <p>For over 24hr</p>
                </div>
              </div>
            </div>

            <div className="contactrow">
              <div className="detailHolderContact">
                <div>
                  <span className="orangeCircleBig"></span>
                </div>
                <div className="detailHolder">
                  <p>20 Margaret st, London</p>
                  <p>Great britain, 3NM98-LK</p>
                </div>
              </div>
              <div className="detailHolderContact">
                <div>
                  <span className="greenCircleBig"></span>
                </div>
                <div className="detailHolder">
                  <p>Free standard shipping</p>
                  <p>on all orders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contactud-row-2">
        <div className="actualform">
          <div>
            <h1>Get In Touch</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam.
            </p>
          </div>
          <div>
            <div className="partedInputField">
              <input
                type="text"
                className="inputFieldforContact sort"
                placeholder="Your Name"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <input
                type="text"
                className="inputFieldforContact sort"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <input
              type="text"
              className="inputFieldforContact"
              placeholder="Subject"
              onChange={(e) => {
                setsubject(e.target.value);
              }}
            />
            <br />
            <textarea
              rows={5}
              cols={67}
              placeholder="Write Your Message*"
              className="textAreaHolder"
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            ></textarea>
            <Button
              className="sendMailButton"
              onClick={() => {
                sendMessage();
              }}
            >
              Send Message
            </Button>
          </div>
        </div>
        <div className="avatarImage">
          <img
            src={contactImg}
            alt="contactpahe"
            height={"400px"}
            width={"600px"}
          />
        </div>
      </div>
      <Sponsers />
    </div>
  );
}

export default ContactUsPage;

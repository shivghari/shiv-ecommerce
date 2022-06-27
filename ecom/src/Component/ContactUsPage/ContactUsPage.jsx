import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ContactUsPage.css";
import contactImg from "./contactImg.jpg";
import Sponsers from "../Sponsers/Sponsers";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Feature/FindUserSlice";
import { useEffect } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function ContactUsPage() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const [messageAlert, setmessageAlert] = useState(null);

  // try{
  //   const { data } = useGetUserQuery(
  //     JSON.parse(localStorage.getItem("token")).userID
  //   );
  // }catch(err){
  //   console.log('user id not logged in ')
  // }



  // useEffect(() => {
  //   if (data != undefined) {
  //     setusername(data?.username);
  //     setemail(data?.email);
  //   }else{
  //     console.log('user is not logged in ')
  //   }
  // }, [data]);

  useEffect(()=>{
    if(localStorage.getItem('token')!= null){
      axios.post("http://localhost:3001/contactus/getUserByID", {
        userID: JSON.parse(localStorage.getItem('token')).userID
      }).then((response)=>{
        console.log(response, 'please check data')
        setusername(response.data.response.username)
        setemail(response.data.response.email)
      }).catch((err)=>{
        console.log(err, 'err')
      })
    }else{
      setusername('')
      setemail('')
    }
  },[])

  const sendMessage = () => {
    var messageData = new FormData();
    if(localStorage.getItem('token') != null){
      messageData.append(
        "userID",
        JSON.parse(localStorage.getItem("token")) 
          ? JSON.parse(localStorage.getItem("token")).userID
          : "62a41371914075fe73ccdd95"
      );
    }else{
      messageData.append('userID', "62a41371914075fe73ccdd95")
    }
    messageData.append("username", username);
    messageData.append("email", email);
    messageData.append("subject", subject);
    messageData.append("message", message);

    axios
      .post("http://localhost:3001/contactus/userMessage", messageData)
      .then((response) => {
        console.log(response);
        setmessageAlert(
          <Alert severity="success">
            <AlertTitle>Message Sent</AlertTitle>
            Admin will contact you soon on: — <strong>{email}</strong>
          </Alert>
        );
      })
      .catch((err) => {
        console.log(err, "err");
        setmessageAlert(
          <Alert severity="error">
            <AlertTitle>Fail</AlertTitle>
            Something went Wrong — <strong>Please try again later</strong>
          </Alert>
        );
      });
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
                required
              />
              <input
                type="text"
                className="inputFieldforContact sort"
                placeholder="Your Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                required
              />
            </div>
            <input
              type="text"
              className="inputFieldforContact"
              placeholder="Subject"
              onChange={(e) => {
                setsubject(e.target.value);
              }}
              required
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
              required
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
          <br />
          {messageAlert}
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

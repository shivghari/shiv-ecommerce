import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import "./MailDetailView.css";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function MailDetailView({ selectedConversationID }) {
  const [mail, setmail] = useState({});
  const [ReplyMessage, setReplyMessage] = useState("");
  const [messageAlert, setmessageAlert] = useState(null);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/contactus/getMail",
        {
          selectedConversationID: selectedConversationID,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response.data.response);
        setmail(response.data.response);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  const replyMail = () => {
    axios
      .post(
        "http://localhost:3001/contactus/replyByAdmin",
        {
          selectedConversationID: selectedConversationID,
          ReplyMessage: ReplyMessage,
          email: mail.email,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setmessageAlert(
          <Alert severity="success">
            <AlertTitle>Mail Sent</AlertTitle>
            Mail Sent Successfullt — <strong>Check It.</strong>
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
    <div>
      <div>
        <p>From : {mail.username}</p>
        <p>Subject: {mail.subject}</p>
        <p> {mail.message}</p>
        <p>{moment(mail.createdAt).fromNow()}</p>
      </div>
      <div className="replyArea">
        <h5>Reply</h5>
        <textarea
          rows={5}
          cols={67}
          placeholder="Write Your Message*"
          className="textAreaHolder"
          onChange={(e) => {
            setReplyMessage(e.target.value);
          }}
        ></textarea>
        <Button
          onClick={() => {
            replyMail();
          }}
        >
          Reply To this Mail
        </Button>
        <br />
        {messageAlert}
      </div>
    </div>
  );
}

export default MailDetailView;

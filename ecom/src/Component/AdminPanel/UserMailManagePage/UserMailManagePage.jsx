import React, { useEffect, useState } from "react";
import "./UserMailManagePage.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dropdown, DropdownButton } from "react-bootstrap";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import moment from "moment";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MailDetailView from "./MailDetailView/MailDetailView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "fitContent",
};

function UserMailManagePage() {
  const [mailData, setmailData] = useState([]);
  const [selectedConversationID, setselectedConversationID] = useState("");

  //model controoller
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/contactus/getAllmail", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      })
      .then((response) => {
        setmailData(response.data.response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div className="mailContactHolder">
      <div>
        <h2>Mails</h2>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Customer Name</TableCell>
                <TableCell align="left">Mail</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mailData &&
                mailData.map((item) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={item._id}
                  >
                    <TableCell align="left" sx={{ width: "200px" }}>
                      <h6>{item.username}</h6>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        <h6>{item.subject}</h6>
                        <p>
                          {item.message.length > 88
                            ? `${item.message.slice(0, 130)}...`
                            : item.message}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {moment(item.createdAt).fromNow()}
                    </TableCell>
                    <TableCell align="left">
                      <DropdownButton title={<MoreVertIcon />} className="more">
                        <Dropdown.Item
                          onClick={() => {
                            setselectedConversationID(item._id);
                            handleOpen();
                          }}
                        >
                          View
                        </Dropdown.Item>
                      </DropdownButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <MailDetailView selectedConversationID={selectedConversationID} />
            </Box>
          </Modal>
        </TableContainer>
      </div>
    </div>
  );
}

export default UserMailManagePage;

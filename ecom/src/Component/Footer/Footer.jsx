import React from "react";
import "./Footer.css";
import { Button } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  return (
    <div className="mainFooterHolder">
      <div className="footerHolder">
        <div className="footerParts">
          <h1>Hetco</h1>
          <div className="InputAndSignin">
            <input placeholder="Enter Email Address" />
            <Button className="SignUpBtnFooter">Sign Up</Button>
          </div>
          <div className="ContactInfoContainer">
            <p className="Contactinfo">Contact Info</p>
            <p className="Contactinfo">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>
        </div>
        <div className="footerParts">
          <h4 className="footerPartsHeading">Catagories</h4>
          <p>Laptops &amp; Computers</p>
          <p>Cameras &amp; Photography</p>
          <p>Smart Phones &amp; Tablets</p>
          <p>Video Games &amp;Consoles</p>
          <p>Waterproof Headphones</p>
        </div>
        <div className="footerParts">
          <h4 className="footerPartsHeading">Customer Care</h4>
          <p>My Account</p>
          <p>Discount</p>
          <p>Return</p>
          <p>Orders History</p>
          <p>Order Treking</p>
        </div>
        <div className="footerParts">
          <h4 className="footerPartsHeading">Pages</h4>
          <p>Browse the Shop</p>
          <p>Category</p>
          <p>Pre-Built Pages</p>
          <p>Visual Composer Elements</p>
          <p>WooCommerce Pages</p>
        </div>
      </div>
      <div>
        <div className="bottomFooter">
          <div className="bottomFooterContentHolder">
            <p className="bottomFooterText">&copy;Website-All right reserved</p>
            <div>
              <FacebookIcon sx={{ color: "#151875", marginRight: "20px" }} />
              <InstagramIcon sx={{ color: "#151875", marginRight: "20px" }} />
              <TwitterIcon sx={{ color: "#151875", marginRight: "20px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

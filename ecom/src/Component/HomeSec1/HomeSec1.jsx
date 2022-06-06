import React from "react";
import "./HomeSec1.css";
import Button from "@mui/material/Button";
import Lamp from "./homepagelight.png";
import Eclips from "./EllipsePink.png";
import Chair from "./chairPink.png";
import BlueSofa from "../HomeSec1/blueSofa.png";
import BrownChair from "../HomeSec1/brownChair.png";

import { Nav, Tab } from "react-bootstrap";

import Rectangle from "./RectanglePink.png";
import SliderComponent from "./SliderComponent";

function HomeSec1() {
  return (
    <div>
      <Tab.Container defaultActiveKey="slide1">
        <Tab.Content>
          <Tab.Pane eventKey="slide1">
            <SliderComponent
              Lamp={Lamp}
              Eclips={Eclips}
              Chair={Chair}
              Button={Button}
              BigHeading={"New Furniture Collection Trends in 2020"}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="slide2">
            <SliderComponent
              Lamp={Lamp}
              Eclips={Eclips}
              Chair={BlueSofa}
              Button={Button}
              BigHeading={"This Sofa can Make your Home Look Good"}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="slide3">
            <SliderComponent
              Lamp={Lamp}
              Eclips={Eclips}
              Chair={BrownChair}
              Button={Button}
              BigHeading={"Furniture is the Key of Luxurious Look"}
            />
          </Tab.Pane>
        </Tab.Content>

        <Nav>
          <div className="slider-rect-container">
            <Nav.Item className="seperate-rect">
              <Nav.Link eventKey="slide1">
                <img src={Rectangle} alt="Slider" />
              </Nav.Link>
              <Nav.Link eventKey="slide2">
                <img src={Rectangle} alt="Slider" />
              </Nav.Link>
              <Nav.Link eventKey="slide3">
                <img src={Rectangle} alt="Slider" />
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
      </Tab.Container>
    </div>
  );
}

export default HomeSec1;

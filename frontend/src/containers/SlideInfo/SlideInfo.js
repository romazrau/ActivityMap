import React, { Component } from "react";
import { Row,Container} from "react-bootstrap";

import PlusCounter from "../../components/Counter"

// import style from "./SlideInfo.module.css"

class SlideInfo extends Component {
    render() {
      return (
          <Container>
              <Row>空</Row>
              <Row>空</Row>
              <Row>空</Row>
              <PlusCounter></PlusCounter>
          </Container>
      )
    }
}


export default  SlideInfo;
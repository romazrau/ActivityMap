import React, { Component } from "react";
import { Row,Container,Col} from "react-bootstrap";


class Home extends Component {
    render() {
      return (
          <Container style={{ paddingTop: "2vh" }}>
              <Col>
              <Row><h3>網站介紹:</h3></Row>
              <Row><p>
                  &nbsp;&nbsp;&nbsp;&nbsp;活動通地圖
                  </p></Row>
              <Row><p></p></Row>
              </Col>
          </Container>
      )
    }
}


export default  Home;
import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";

class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <HeaderNavBar />
          </Col>
        </Row>
        <Row />
        <Row>
          <Col>地圖區</Col>
          <Col xs="3">控制區</Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <p>底部</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;

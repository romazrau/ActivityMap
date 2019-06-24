import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Row, Col, Navbar } from "react-bootstrap";

import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";
import SlideInfo from "./SlideInfo/SlideInfo";
import style from "./App.module.css";

class App extends Component {

  render() {

    return (
      <div>
        <BrowserRouter>
          <Row>
            <Col>
              <HeaderNavBar />
            </Col>
          </Row>
          <Row />
          <Row className={style.mainwindow}>
            <Col>
              地圖區
              <div id="map" />
            </Col>
            <Col xs={3} lg="2" className={style.slidewindow}>
              {/**控制區 */}
              <Switch>
                <Route exact path="/" component={() => <div>原始</div>} />
                <Route path="/info" component={SlideInfo} />
                {/* <Route path="/game" component={Slide} /> */}
                {/* <Redirect from="/home" to="/" /> */}
                <Route render={() => <div>尚未有功能開放</div>} />
              </Switch>
            </Col>
          </Row>
          <Row>
            <Col>
              <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
                <Navbar.Text>底部</Navbar.Text>
              </Navbar>
            </Col>
          </Row>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

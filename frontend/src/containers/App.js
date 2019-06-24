import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Col, Navbar } from "react-bootstrap";

import styles from "./App.module.css";
import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";
import SlideInfo from "./SlideInfo/SlideInfo";
import Map from "./MapWindow/MapWindow";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
     
          <HeaderNavBar />
 
          <div className={styles.mainwindow}>
            <Col style={{ paddingRight: "0px", paddingLeft: "0px" }}>
              <Map />
            </Col>
            <div className={styles.slidewindow}>
              {/**控制區 */}
              <Switch>
                <Route exact path="/" component={() => <div>原始</div>} />
                <Route path="/info" component={SlideInfo} />
                {/* <Route path="/game" component={Slide} /> */}
                {/* <Redirect from="/home" to="/" /> */}
                <Route render={() => <div>尚未有功能開放</div>} />
              </Switch>
            </div>
          </div>

          <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            fixed="bottom"
            className={styles.bottom}
          >
            底部 - 開發中的地圖
          </Navbar>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar,Container } from "react-bootstrap";

import styles from "./App.module.css";
import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";
import SlideInfo from "./SlideInfo/SlideInfo";
import Map from "./MapWindow/MapWindow";
//
class App extends Component {
  slideBtnClick() {
    console.log("slide btn clicked");
    let slidewindow = document.getElementById("slidewindow");
    let slideBtn = document.getElementById("slideBtn");
    if (slidewindow.className === styles.slidewindowClose) {
      slidewindow.classList.remove(styles.slidewindowClose);
      slideBtn.classList.remove(styles.slideBtnClose);
      slidewindow.classList.add(styles.slidewindow);
      slideBtn.classList.add(styles.slideBtn);
    } else {
      slidewindow.classList.remove(styles.slidewindow);
      slideBtn.classList.remove(styles.slideBtn);
      slidewindow.classList.add(styles.slidewindowClose);
      slideBtn.classList.add(styles.slideBtnClose);
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <HeaderNavBar />

          <div className={styles.mainwindow}>
            <Map />
          </div>
          <div className={styles.slidewindow} id="slidewindow">
            {/**控制區 */}
            <Container>
            <Switch>
              <Route exact path="/" component={() => <div>原始</div>} />
              <Route path="/info" component={SlideInfo} />
              {/* <Route path="/game" component={Slide} /> */}
              {/* <Redirect from="/home" to="/" /> */}
              <Route render={() => <div>尚未開放功能</div>} />
            </Switch>
            </Container>
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
        <div
          id="slideBtn"
          className={styles.slideBtn}
          onClick={() => this.slideBtnClick()}
        />
      </div>
    );
  }
}

export default App;

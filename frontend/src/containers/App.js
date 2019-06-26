import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar,Container } from "react-bootstrap";
import { connect } from "react-redux";

import styles from "./App.module.css";
import HeaderNavBar from "./HeaderNavBar/HeaderNavBar";
import SlideInfo from "./SlideInfo/SlideInfo";
import Map from "./MapWindow/MapWindow";
import Home from "../components/Home/Home"
import { slidewindowToggle } from "../redux/actions/index";

const mapStateToProps = state => {
  return {  isSlidewindowShow: state.isSlidewindowShow };
};

function mapDispatchToProps(dispatch) {
  return {
    chickSlidewindowToggle: () => dispatch(slidewindowToggle())
  };
}
//
class ConnectedApp extends Component {
  slidewindowToggle(){
    let slidewindow = document.getElementById("slidewindow");
    let slideBtn = document.getElementById("slideBtn");
    if (this.props.isSlidewindowShow === 0) {
      slidewindow.classList.remove(styles.slidewindowClose);
      slideBtn.classList.remove(styles.slideBtnClose);
      slidewindow.classList.add(styles.slidewindow);
      slideBtn.classList.add(styles.slideBtn);
      slideBtn.innerHTML="<i class='fas fa-angle-double-right'></i>";
    } else {
      slidewindow.classList.remove(styles.slidewindow);
      slideBtn.classList.remove(styles.slideBtn);
      slidewindow.classList.add(styles.slidewindowClose);
      slideBtn.classList.add(styles.slideBtnClose);
      slideBtn.innerHTML="<i class='fas fa-angle-double-left'></i>";
    }
  }

  slideBtnClick() {
    this.slidewindowToggle();
    this.props.chickSlidewindowToggle();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isSlidewindowShow === 1 && document.getElementById("slidewindow").className===styles.slidewindowClose){
      this.slidewindowToggle();
    } 
    return false;
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
              <Route exact path="/" component={Home} />
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
        >
          <i className="fas fa-angle-double-right"></i>
        </div>
      </div>
    );
  }
}
const App = connect(mapStateToProps,mapDispatchToProps)(ConnectedApp);
export default App;

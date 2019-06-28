import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./HeaderNavBar.module.css";
import { slidewindowShow } from "../../redux/actions/index";

function mapDispatchToProps(dispatch) {
  return {
    chickSlidewindowOpen: () => dispatch(slidewindowShow())
  };
}
class ConnectedHeaderNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  chickSlidewindowOpen=()=>{
    console.log("Header Navlink clicked");
    this.props.chickSlidewindowOpen();
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
        <Navbar.Brand href="#home" ><i className="fas fa-bullhorn fa-1x"> </i>活動通地圖</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto">
              <NavLink to="/" activeStyle={{ color: "#fa923f" }} exact className={styles.navlink} onClick={this.chickSlidewindowOpen}>home(路由)</NavLink>
              <NavLink to="/info" activeStyle={{ color: "#fa923f" }} className={styles.navlink} onClick={this.chickSlidewindowOpen}>info(路由)</NavLink>
              <NavLink to="/xvideo18" activeStyle={{ color: "#fa923f" }} className={styles.navlink} onClick={this.chickSlidewindowOpen}>未開放功能(路由)</NavLink>
            {/* <Nav.Link href="#link">#跟/的差別?</Nav.Link> */}
            <NavDropdown title="更多的切換" id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end" >
          <Navbar.Text>
            Signed in as:  <NavLink to="/authenticate" activeStyle={{ color: "#fa923f" }}>None</NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const HeaderNavBar = connect(null, mapDispatchToProps)(ConnectedHeaderNavBar);
export default HeaderNavBar;
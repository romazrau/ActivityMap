import React from "react";
import { connect } from "react-redux";
import { plusCounter } from "../redux/actions/index";
const mapStateToProps = state => {
  return { counter: state.counter };
};

function mapDispatchToProps(dispatch) {
  return {
    onclickplus: () => dispatch(plusCounter())
  };
}

const ConnectedList = ({ counter,consoso,onclickplus }) => (
  <ul className="list-group list-group-flush">
      <li className="list-group-item" >
        {counter}
        <button onClick={()=>onclickplus()}>PLUS</button>
      </li>
  </ul>
);
const Counter = connect(mapStateToProps,mapDispatchToProps)(ConnectedList);  //
export default Counter;


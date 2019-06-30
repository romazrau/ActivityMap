import { IS_SLIDEWINDOW_SHOW,SLIDEWINDOW_TOGGLE,SHOW_FEATURE_INFO } from "../constants/action-types";
const initialState = {
  isSlidewindowShow: 1,
  selcetFeatureInfo: null
};
function rootReducer(state = initialState, action) {

  if (action.type === IS_SLIDEWINDOW_SHOW && state.isSlidewindowShow === 0){
    console.log("Slidewindow show(reducers)")
    return Object.assign({}, state, {isSlidewindowShow: 1});
  }

  if (action.type === SLIDEWINDOW_TOGGLE){
    console.log("Slidewindow Toggle(reducers)")
    return Object.assign({}, state, {isSlidewindowShow: state.isSlidewindowShow===1?0:1});
  }

  if (action.type === SHOW_FEATURE_INFO){
    console.log("SHOW FEATURE INFO(reducers)")
    return Object.assign({}, state, {selcetFeatureInfo: action.payload});
  }


  return state;
}
export default rootReducer;
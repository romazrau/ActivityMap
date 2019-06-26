import { ADD_ARTICLE,PLUS_COUNTER,IS_SLIDEWINDOW_SHOW,SLIDEWINDOW_TOGGLE } from "../constants/action-types";
const initialState = {
  articles: [],
  counter: 0,
  isSlidewindowShow: 1
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    // state.articles.push(action.payload);
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === PLUS_COUNTER){
    console.log("Plus Button Clicked(reducers)")
    return Object.assign({}, state, {counter: state.counter+1});
  }

  if (action.type === IS_SLIDEWINDOW_SHOW && state.isSlidewindowShow === 0){
    console.log("Slidewindow show(reducers)")
    return Object.assign({}, state, {isSlidewindowShow: 1});
  }

  if (action.type === SLIDEWINDOW_TOGGLE){
    console.log("Slidewindow Toggle(reducers)")
    return Object.assign({}, state, {isSlidewindowShow: state.isSlidewindowShow===1?0:1});
  }

  return state;
}
export default rootReducer;
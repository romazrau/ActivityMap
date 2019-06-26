import { ADD_ARTICLE,PLUS_COUNTER,IS_SLIDEWINDOW_SHOW,SLIDEWINDOW_TOGGLE } from "../constants/action-types";
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
export function plusCounter(payload){
  return { type: PLUS_COUNTER, payload};
}
export function slidewindowShow(payload){
  return { type: IS_SLIDEWINDOW_SHOW, payload};
}

export function slidewindowToggle(payload){
  return { type: SLIDEWINDOW_TOGGLE, payload};
}
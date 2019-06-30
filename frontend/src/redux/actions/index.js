import { IS_SLIDEWINDOW_SHOW,SLIDEWINDOW_TOGGLE,SHOW_FEATURE_INFO } from "../constants/action-types";
export function slidewindowShow(payload){
  return { type: IS_SLIDEWINDOW_SHOW, payload};
}

export function slidewindowToggle(payload){
  return { type: SLIDEWINDOW_TOGGLE, payload};
}

export function showFeatureInfo(payload){
  return { type: SHOW_FEATURE_INFO, payload};
}
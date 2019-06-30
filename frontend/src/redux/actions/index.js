import { IS_SLIDEWINDOW_SHOW,SLIDEWINDOW_TOGGLE,SHOW_FEATURE_INFO,USER_ID_UPDATA  } from "../constants/action-types";
export function slidewindowShow(payload){
  return { type: IS_SLIDEWINDOW_SHOW, payload};
}

export function slidewindowToggle(payload){
  return { type: SLIDEWINDOW_TOGGLE, payload};
}

export function showFeatureInfo(payload){
  return { type: SHOW_FEATURE_INFO, payload};
}

export function userIDupdate(payload){
  return { type: USER_ID_UPDATA , payload};
}
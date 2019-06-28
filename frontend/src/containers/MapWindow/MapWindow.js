import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlSourceOSM from "ol/source/OSM";
import OlSourceXYZ from "ol/source/XYZ";
import OLSourceVector from "ol/source/Vector";
import OlFormatGeoJson from "ol/format/GeoJSON";
// import { register } from "ol/proj/proj4";
import { fromLonLat } from "ol/proj";
// import Proj4 from "proj4/dist/proj4";

import styles from "./MapWindow.module.css";

//地圖OSM、google提供3857
//? proj4 轉換座標用
// console.log(Proj4)
// Proj4.defs(
//   "EPSG:3857",
//   "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
// );
// Proj4.defs("urn:ogc:def:crs:OGC:1.3:CRS:84", Proj4.defs("EPSG:4326"));
// Proj4.defs("urn:ogc:def:crs:EPSG::3857", Proj4.defs("EPSG:3857"));
// register(Proj4);

class PublicMap extends Component {
  constructor(props) {
    super(props);

    this.state = { center: fromLonLat([120.5, 23.62]), zoom: 7 };

    this.layers = {
      //底圖
      OSM: {
        //OSM物件
        title: "OpenStreetMap(開放街圖)", //名字會顯示
        type: "base",
        layer: new OlLayerTile({
          visible: false,
          source: new OlSourceOSM() //OSM提供的公式
        })
      },
      GoogleMaps: {
        title: "Google Maps",
        type: "base",
        layer: new OlLayerTile({
          visible: false,
          source: new OlSourceXYZ({
            crossOrigin: "anonymous",
            url: "https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" //估狗規定的網址，lyrs=m可以改變成不同圖層(分開寫就是多個底圖!)
          })
        })
      },
      county: {
        // ! GEOJSON 無法開啟
        title: "縣市範圍",
        type: "overlay",
        layer: new OlLayerVector({
          visible: false,
          source: new OLSourceVector({
            format: new OlFormatGeoJson(),
            url: "../../../data_geo/county.geojson"
          })
        })
      }
    };

    this.olmap = new OlMap({
      target: null,
      layers: Object.keys(this.layers).map(e => this.layers[e].layer),
      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  setLayer(key) {
    //function setLayer(idx)   切換底圖顯示
    for (let i = 0; i < Object.keys(this.layers).length; i++) {
      var tlayer = this.layers[Object.keys(this.layers)[i]];
      if (tlayer.type === "base"){
        this.layers[Object.keys(this.layers)[i]].layer.setVisible(
          Object.keys(this.layers)[i] === key
        );
        let baseBtn = document.getElementById(Object.keys(this.layers)[i]+"Btn").classList
        if( Object.keys(this.layers)[i] === key){
          baseBtn.add(styles.BtnFocus)
        }else{
          baseBtn.remove(styles.BtnFocus)
        }
      }
        
    }
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.setLayer("OSM");
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [13530000, 2880000], zoom: 11.5 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <div className={styles.float}>
          <button onClick={e => this.userAction()} className={styles.Btn}>
            Focus to Taipei
          </button>
          <button onClick={e => this.setLayer("OSM")} className={styles.Btn} id="OSMBtn">
            OSM
          </button>
          <button
            onClick={e => this.setLayer("GoogleMaps")}
            className={styles.Btn}
            id="GoogleMapsBtn"
          >
            GMAP
          </button>
        </div>
      </div>
    );
  }
}

export default PublicMap;

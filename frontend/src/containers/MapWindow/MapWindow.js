import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlSourceOSM from "ol/source/OSM";
import OlSourceXYZ from "ol/source/XYZ";
import OLSourceVector from "ol/source/Vector";
import OlFormatGeoJson from "ol/format/GeoJSON";
import OlStyleStyle from "ol/style/Style";
import OlStyleStroke from "ol/style/Stroke";
import OlStyleFill from "ol/style/Fill";
import OlStyleCircle from "ol/style/Circle";
import OlSelect from "ol/interaction/Select.js";
import { fromLonLat as OlFromLonLat, get as OlGet } from "ol/proj";

import styles from "./MapWindow.module.css";
import layerMetroline from "../../data_geo/metroline.geojson";
import layerAct from "../../data_geo/act.geojson";
import layerBird from "../../data_geo/bird.geojson";

import { connect } from "react-redux";
import { showFeatureInfo } from "../../redux/actions/index";

function mapDispatchToProps(dispatch) {
  return {
    showFeatureInfo: info => dispatch(showFeatureInfo(info))
  };
}
class ConnectedPublicMap extends Component {
  //ol預設投影:3857
  constructor(props) {
    super(props);

    this.state = { center: OlFromLonLat([120.5, 23.62]), zoom: 7 };

    this.styles = {
      // activity: [
      //   new OlStyleStyle({
      //     image: new OlStyleIcon({
      //       anchor: [4, 32],
      //       anchorXUnits: "pixels",
      //       anchorYUnits: "pixels",
      //       opacity: 1.0,
      //       crossOrigin: "anonymous",
      //       src: imglocal
      //     })
      //   })
      // ],
      metroline: [
        new OlStyleStyle({
          stroke: new OlStyleStroke({
            color: "rgba(100, 100, 255, 0.9)",
            width: 4,
            lineDash: [4, 8] //line dash pattern [line, space]
          })
        })
      ],
      bird: new OlStyleStyle({
        image: new OlStyleCircle({
          radius: 7,
          fill: new OlStyleFill({
            color: "#ff0000"
          }),
          stroke: new OlStyleStroke({
            color: "rgba(255, 255, 255, 0.5)",
            width: 2
          })
        })
      })
    };

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
      GoogleMapsS: {
        title: "Google Maps S",
        type: "base",
        layer: new OlLayerTile({
          visible: false,
          source: new OlSourceXYZ({
            crossOrigin: "anonymous",
            url: "https://mt{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" //估狗規定的網址，lyrs=m可以改變成不同圖層(分開寫就是多個底圖!)
          })
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
      metroline: {
        title: "捷運線",
        type: "overlay",
        layer: new OlLayerVector({
          visible: true,
          source: new OLSourceVector({
            format: new OlFormatGeoJson(),
            url: layerMetroline
          })
        })
      },
      activity: {
        title: "展覽活動",
        type: "overlay",
        layer: new OlLayerVector({
          visible: true,
          source: this.loadJsonSourceWithAjax(layerAct)
        })
      },
      bird: {
        title: "bird",
        type: "overlay",
        layer: new OlLayerVector({
          visible: true,
          source: new OLSourceVector({
            format: new OlFormatGeoJson(),
            url: layerBird
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

  //! 迷之公式
  loadJsonSourceWithAjax(url) {
    var source = new OLSourceVector({});
    fetch(url)
      .then(res => res.json())
      .then(
        geojson => {
          var options = {};
          if (
            typeof geojson.crs != "undefined" &&
            typeof geojson.crs.properties != "undefined" &&
            typeof geojson.crs.properties.name != "undefined"
          ) {
            options = {
              dataProjection: OlGet("EPSG:4326"), //'EPSG:3826','EPSG:4326'
              featureProjection: OlGet("EPSG:3857")
            };
          }
          var features = new OlFormatGeoJson().readFeatures(geojson, options);
          source.addFeatures(features);

          console.log(features.length);
          console.log(source);
          return source;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  setLayer(key) {
    //切換底圖層顯示
    for (let i = 0; i < Object.keys(this.layers).length; i++) {
      var tlayer = this.layers[Object.keys(this.layers)[i]];
      if (tlayer.type === "base") {
        this.layers[Object.keys(this.layers)[i]].layer.setVisible(
          Object.keys(this.layers)[i] === key
        );
        let baseBtn = document.getElementById(
          Object.keys(this.layers)[i] + "Btn"
        ).classList;
        if (Object.keys(this.layers)[i] === key) {
          baseBtn.add(styles.BtnFocus);
        } else {
          baseBtn.remove(styles.BtnFocus);
        }
      }
    }
  }

  setOverLayer(key) {
    //切換圖層顯示
    let btnstyle = document.getElementById(key + "Btn");
    if (btnstyle.className === styles.BtnFocus) {
      this.layers[key].layer.setVisible(false);
      btnstyle.classList.remove(styles.BtnFocus);
      btnstyle.classList.add(styles.Btn);
    } else {
      this.layers[key].layer.setVisible(true);
      btnstyle.classList.remove(styles.Btn);
      btnstyle.classList.add(styles.BtnFocus);
    }
  }

  initLayers() {
    //上圖層STYLE
    for (let i = 0; i < Object.keys(this.layers).length; i++) {
      var tlayer = this.layers[Object.keys(this.layers)[i]];
      if (tlayer.type === "overlay") {
        tlayer.layer.setZIndex(10000 - i);
        tlayer.layer.setStyle(this.styles[Object.keys(this.layers)[i]]);
      }
    }
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  focus2taipei() {
    this.setState({ center: [13530000, 2883000], zoom: 11.5 });
  }

  router2info=(e)=> {
    this.props.history.push(`/info/${e}`);
  }

  // source: new OLSourceVector({
  //   features: (new OlFormatGeoJson()).readFeatures(layerAct, {     // 用readFeatures方法可以自定义坐标系
  //     dataProjection: 'EPSG:4326',    // 设定JSON数据使用的坐标系
  //     featureProjection: 'EPSG:3857' // 设定当前地图使用的feature的坐标系
  // })

  componentDidMount() {
    this.initLayers();
    this.setLayer("OSM");
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });

    var select = new OlSelect();
    this.olmap.addInteraction(select);
    const showFeatureInfo = this.props.showFeatureInfo;
    const router2info =this.router2info;
    select.on("select", function(e) {
      if (
        e.selected[0] !== undefined &&
        e.selected[0].values_.geometry.getType() === "Point"
      ) {
        // console.log(e.target.getFeatures())
        console.log(e.selected[0].values_);
        const { LAT, LONG } = e.selected[0].values_;
        showFeatureInfo([LAT, LONG]);
        router2info("這邊放title")
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ width: "100%", height: "100%" }}>
        <div className={styles.float}>
          <button onClick={e => this.focus2taipei()} className={styles.Btn}>
            Focus to Taipei
          </button>
          &nbsp;
          <button
            onClick={e => this.setLayer("OSM")}
            className={styles.Btn}
            id="OSMBtn"
            style={{ borderRadius: "4px 0 0 4px" }}
          >
            OSM街道圖
          </button>
          <button
            onClick={e => this.setLayer("GoogleMaps")}
            className={styles.Btn}
            id="GoogleMapsBtn"
            style={{ borderRadius: "0 0px 0px 0" }}
          >
            估狗街道圖
          </button>
          <button
            onClick={e => this.setLayer("GoogleMapsS")}
            className={styles.Btn}
            id="GoogleMapsSBtn"
            style={{ borderRadius: "0 4px 4px 0" }}
          >
            估狗衛星影像
          </button>
          &nbsp;
          <button
            onClick={() => this.setOverLayer("metroline")}
            className={styles.BtnFocus}
            id="metrolineBtn"
          >
            台北捷運
          </button>
        </div>
      </div>
    );
  }
}

const PublicMap = connect(
  null,
  mapDispatchToProps
)(ConnectedPublicMap); //
export default withRouter(PublicMap);

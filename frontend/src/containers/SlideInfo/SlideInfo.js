import React, { Component } from "react";
import { Container, Image, Col } from "react-bootstrap";

import styles from "./SlideInfo.module.css";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    selcetFeatureInfo: state.selcetFeatureInfo,
    userid: state.userid,
    token: state.token
  };
};
class ConnectedSlideInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { likeNumber: 0 };
  }

  likeplus = () => {
    if (!this.props.userid) {
      alert("您尚未登入喔");
      return;
    }

    if (!this.props.selcetFeatureInfo) {
      console.log("未獲取點資料");
      return;
    }

    console.log(this.props.selcetFeatureInfo[0]); //文章ID
    console.log(this.props.token);
    //後端互動放這裡
  };

  componentDidMount() {
    //跟資料庫互動獲取讚數
    //更新this.state.likeNumber
  }

  render() {
    let display = null;
    if (!this.props.selcetFeatureInfo) {
      display = (
        <Col style={{ paddingTop: "10vh" }}>
          <Image src={require("../../img/bukkyou_sottakudouji.png")} fluid />
          <h5>點擊圖徵選取活動資訊</h5>
        </Col>
      );
    } else {
      display = (
        <div>
          <h4>{this.props.selcetFeatureInfo[1]}</h4>
          <hr />
          <table>
            <tbody>
              <tr>
                <th className={styles.tabletitle}>活動地點:</th>
                <td>{this.props.selcetFeatureInfo[4]}</td>
              </tr>
              <tr>
                <th className={styles.tabletitle}>開始時間:</th>
                <td>{this.props.selcetFeatureInfo[2]}</td>
              </tr>
              <tr>
                <th className={styles.tabletitle}>結束時間:</th>
                <td>{this.props.selcetFeatureInfo[3]}</td>
              </tr>
            </tbody>
          </table>
          <hr />
          本活動獲得{this.state.likeNumber}個
          <button className={styles.likeplus} onClick={this.likeplus}>
            <i className="fa fa-heart" />
          </button>
          <hr />
          <div>{this.props.selcetFeatureInfo[5].split('&nbsp;')}</div>
        </div>
      );
    }

    return <Container style={{ paddingTop: "2vh" }}>{display}</Container>;
  }
}

const SlideInfo = connect(mapStateToProps)(ConnectedSlideInfo);
export default SlideInfo;

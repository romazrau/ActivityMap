import React, { Component } from "react";
import { Container,Col} from "react-bootstrap";
import { Query } from "react-apollo"; //, Mutation,Subscription

import styles from "./SlideInfo.module.css"
import { connect } from "react-redux";
import {
    ACTINFO_INDIVIDUAL_QUERY,
  } from "../../graphql";


const mapStateToProps = state => {
  return { selcetFeatureInfo: state.selcetFeatureInfo };
};
class ConnectedSlideInfo extends Component {

    render() {
      let display= null;
        if(!this.props.selcetFeatureInfo){
          display= <Col><h5>點擊地圖選取活動資訊</h5></Col>
        }else{
          display= (
            <div>
            <h4>{this.props.selcetFeatureInfo[1]}</h4>
            <hr/>
            <table>
              <tbody>
                <tr>
                  <th className={styles.tabletitle}>
                  活動地點:
                  </th>
                  <td>
                  {this.props.selcetFeatureInfo[4]}
                  </td>
                </tr>
                <tr>
                  <th>
                  開始時間:
                  </th>
                  <td>
                  {this.props.selcetFeatureInfo[2]}
                  </td>
                </tr>
                <tr>
                  <th>
                  結束時間:
                  </th>
                  <td>
                  {this.props.selcetFeatureInfo[3]}
                  </td>
                </tr>
              </tbody>
            </table>
            <hr/>
            <div>{this.props.selcetFeatureInfo[5]}</div>
            </div>
          )
        }

      return (
          <Container style={{paddingTop:"2vh"}}>
              {display}
              <hr/>
              <Col><Query query={ACTINFO_INDIVIDUAL_QUERY} variables={{ id: 10 }}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(((</p>;
                if (data.actInfo) return <div>Query: {data.actInfo[0].id},title: {data.actInfo[0].title}</div>;
                return <p>資料庫連接失敗</p>
              }}
            </Query></Col>
          </Container>
      )
    }
}

const SlideInfo = connect(
  mapStateToProps
)(ConnectedSlideInfo);
export default  SlideInfo;
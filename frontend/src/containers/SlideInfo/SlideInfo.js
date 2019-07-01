import React, { Component } from "react";
import { Row,Container} from "react-bootstrap";
import { Query } from "react-apollo"; //, Mutation,Subscription

import { connect } from "react-redux";
import {
    ACTINFO_INDIVIDUAL_QUERY,
  } from "../../graphql";

// import style from "./SlideInfo.module.css"

const mapStateToProps = state => {
  return { selcetFeatureInfo: state.selcetFeatureInfo };
};
class ConnectedSlideInfo extends Component {

    render() {
      let display= null;
        if(!this.props.selcetFeatureInfo){
          display= <h5>點擊地圖選取活動資訊</h5>
        }else{
          display= <div>{this.props.selcetFeatureInfo}有資訊喔</div>
        }

      return (
          <Container style={{paddingTop:"2vh"}}>
              <Row>{display}</Row>
              <Row>----</Row>
              <Row><Query query={ACTINFO_INDIVIDUAL_QUERY} variables={{ id: 10 }}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(((</p>;
                if (data.actInfo) return <div>Query: {data.actInfo[0].id},title: {data.actInfo[0].title}</div>;
                return <p>資料庫連接失敗</p>
              }}
            </Query></Row>
          </Container>
      )
    }
}

const SlideInfo = connect(
  mapStateToProps
)(ConnectedSlideInfo);
export default  SlideInfo;
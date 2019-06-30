import React, { Component } from "react";
import { Row,Container} from "react-bootstrap";
import { Query } from "react-apollo"; //, Mutation,Subscription

import {
    ACTINFO_INDIVIDUAL_QUERY,
  } from "../../graphql";
import PlusCounter from "../../components/Counter"

// import style from "./SlideInfo.module.css"

class SlideInfo extends Component {
    render() {
      return (
          <Container>
              <Row>空</Row>
              <Row>空</Row>
              <Row>空</Row>
              <PlusCounter></PlusCounter>
              <Query query={ACTINFO_INDIVIDUAL_QUERY} variables={{ id: 10 }}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(((</p>;

                return <div>Query: {data.actInfo[0].id},title: {data.actInfo[0].title}</div>;
              }}
            </Query>
          </Container>
      )
    }
}


export default  SlideInfo;
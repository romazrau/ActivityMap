import React, { Component } from "react";
import { Form, Col, Button, Container, Card, Image } from "react-bootstrap";

import styles from "./Authenticate.module.css";

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSingUp: 0,
      formID: "",
      formPassword: "",
      formPasswordcheck: ""
    };
  }

    handleFormSubmit = e => {
      e.preventDefault();
      console.log(this.state.formID,this.state.formPassword)
    //   const { formUser,formTitle, formBody } = this.state;
    //   if (!formTitle || !formBody) return;
    //   this.createPost({
    //     variables: {
    //       title: formTitle,
    //       body: formBody,
    //       published: true,
    //       authorId: Number(formUser)
    //     }
    //   });

      this.setState({
        formID: "",
        formPassword: "",
        formPasswordcheck: ""
      });
    };

    toggleSingup=()=>{
        this.setState({
            formPassword: "",
            formPasswordcheck: ""
        });
        this.state.isSingUp===0?this.setState({isSingUp: 1}):this.setState({isSingUp: 0});
    }

  render() {
    if(this.state.isSingUp===0){
        return (
            <div style={{ backgroundColor: "rgb(170, 211, 223)" }}>
              <Container className={styles.base}>
                <Image src={require("./OSM.png")} fluid className={styles.img} />
                <Col lg="10" className={styles.card}>
                  <Card>
                    <Card.Header as="h5">使用者登入</Card.Header>
                    <Card.Body>
                      <div>
                        <Form>
                          <Form.Group controlId="formBasicUserID">
                            <Form.Label>輸入帳號</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your ID"
                              value={this.state.formID}
                              onChange={e => {
                                this.setState({
                                  formID: e.target.value
                                });
                              }}
                            />
                          </Form.Group>
      
                          <Form.Group controlId="formBasicPassword">
                            <Form.Label>輸入密碼</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              value={this.state.formPassword}
                              onChange={e => {
                                this.setState({
                                  formPassword: e.target.value
                                });
                              }}
                            />
                          </Form.Group>
           
                          <Button variant="info" type="submit" onClick={this.handleFormSubmit}>
                            登入
                          </Button>
                          <div className={styles.smalltext}>
                              沒有帳號嗎?&nbsp;
                              <Button variant="secondary" className={styles.smallBtn} size="sm" onClick={this.toggleSingup}>
                                  註冊帳號
                                  </Button>
                          </div>
     
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Container>
            </div>
          );
    }else{
        return(
            <div style={{ backgroundColor: "rgb(170, 211, 223)" }}>
            <Container className={styles.base}>
              <Image src={require("./OSM.png")} fluid className={styles.img} />
              <Col lg="10" className={styles.card}>
                <Card>
                  <Card.Header as="h5">註冊帳號</Card.Header>
                  <Card.Body>
                    <div>
                      <Form>
                        <Form.Group controlId="formBasicUserID">
                          <Form.Label>輸入帳號</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your ID"
                            value={this.state.formID}
                            onChange={e => {
                              this.setState({
                                formID: e.target.value
                              });
                            }}
                          />
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>輸入密碼</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.formPassword}
                            onChange={e => {
                              this.setState({
                                formPassword: e.target.value
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicPasswordcheck">
                          <Form.Label>密碼確認</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.formPasswordcheck}
                            onChange={e => {
                              this.setState({
                                formPasswordcheck: e.target.value
                              });
                            }}
                          />
                        </Form.Group>
         
                        <Button variant="info" type="submit" onClick={this.handleFormSubmit}>
                          註冊
                        </Button>
                        <div className={styles.smalltext}>
                            已經有帳號了嗎?&nbsp;
                            <Button variant="secondary" size="sm" className={styles.smallBtn} onClick={this.toggleSingup}>
                                返回登入畫面
                                </Button>
                        </div>
                 
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Container>
          </div>
        );
    }
}  
}

export default Authenticate;

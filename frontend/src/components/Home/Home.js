import React, { Component } from "react";
import { Row,Container} from "react-bootstrap";


class Home extends Component {
    render() {
      return (
          <Container>
              <Row><h3>介紹:</h3></Row>
              <Row><p>&nbsp;&nbsp;&nbsp;&nbsp;CSS3 opacity 屬性的功能是用來控制網頁元素的透明效果（調整不透明度），早期網頁設計常常會用到許多的透明效果，通常都是透過 png 圖層來製作透明的感覺，現在網頁設計師可以使用 CSS3 opacity 屬性來輕鬆的達到網頁元素不透明度的調整，CSS3 opacity 屬性的語法非常簡單，只需要透過數字的調整，就能呈現出不同的不透明度，進而設計出相當具有現代感的網頁風格，可應用在網頁圖片、DIV 區塊、span 區域、Table 表格 ... 等元素，所有新版的主流瀏覽器都支援 CSS3 opacity 屬性的效果。</p></Row>
              <Row><p>可可</p></Row>
          </Container>
      )
    }
}


export default  Home;
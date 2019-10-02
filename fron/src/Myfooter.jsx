import React, { Component } from "react";
import { Layout, Icon } from "antd";

const { Footer } = Layout;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1441857_phyre87dyv.js"
});

class Myfooter extends Component {
  componentDidMount() {}

  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#8f000b",
          color: "#fff"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <IconFont className="nav-icon-1" type="iconlishi" />
          <div
            style={{ margin: "5px 0", fontWeight: "bold", fontSize: "20px" }}
          >
            <img style={{maxWidth: '360px'}} src='/homefont1.png'></img>
          </div>
          <div
            style={{ margin: "5px 0", fontWeight: "bold", fontSize: "12px" }}
          >
            历史资料室 ©2019 Created by XUANLAN
          </div>
        </div>
      </Footer>
    );
  }
}

export default Myfooter;

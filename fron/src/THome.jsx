import React, { Component } from "react";
import { Layout, BackTop, Input, Row, Col } from "antd";

import Nav from "./Nav";
import Myfooter from "./Myfooter";

const { Search } = Input;

class BookPage extends Component {
  page = 1;
  state = {
    init: "历史资料室查阅系统"
  };

  onSearch = value => {
    if (value === "") {
      return;
    }
    this.props.history.replace("/book?" + "search=" + value);
  };

  componentDidMount = async v => {};

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <BackTop />
        <div
          style={{
            flex: "1 0",
            background: "#fff"
          }}
        >
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 14, offset: 5 }}
              xl={{ span: 12, offset: 6 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div style={{ marginTop: "60px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div
                  style={{
                    marginBottom: "20px"
                  }}
                >
                  <img style={{maxWidth: '380px'}} src='/homefont.png'></img>
                </div>
                <br></br>
                <Search
                  placeholder="请输入 书籍编号/书名/作者/译者/出版社 中任意项"
                  enterButton="搜索"
                  size="large"
                  onSearch={this.onSearch}
                  allowClear={true}
                  style={{maxWidth: '520px', boxShadow: '0 4px 6px rgba(0,0,0,.18)', borderRadius: '20px'}}
                />
              </div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}
export default BookPage;

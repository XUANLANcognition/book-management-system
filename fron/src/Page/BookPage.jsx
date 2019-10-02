import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Tag,
  List,
  Collapse,
  Icon,
  Descriptions,
  BackTop,
  Input,
  Affix,
  Skeleton
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

import Nav from "../Nav";
import Myfooter from "../Myfooter";
import Advertisement from "../Advertisement";
import CategoryList from "../CategoryList";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1242637_lapfux51pxk.js"
});

const CheckableTag = Tag.CheckableTag;
const { Title } = Typography;
const count = 6;
const customPanelStyle = {
  background: "#fff",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};
const Panel = Collapse.Panel;
const { Search } = Input;

class BookPage extends Component {
  page = 1;
  state = {
    cache: [],
    selectedTags: [],
    loading: true,
    tags: [],
    count: 0,
    search: this.props.location.search
      ? window.decodeURI(this.props.location.search.slice(8))
      : "",
    fliterTag: ""
  };

  componentDidMount = async v => {
    await this.getData();
    console.log("dwdwdw", this.props);
    this.setState({ loading: false });
  };

  getData = async v => {
    try {
      let url = "";
      if (this.state.fliterTag.length === 0) {
        url =
          "https://finewf.club:9900/api/books/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search;
      } else {
        url =
          "https://finewf.club:9900/api/books/?format=json" +
          "&page=" +
          this.page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search +
          "&tag=" +
          this.state.fliterTag;
      }
      const response = await axios.get(url);
      const temp = [];
      for (let index = 0; index < response.data.count; index++) {
        temp.push({ title: "", cover: "", author: "", id: index });
      }
      this.setState({
        cache: temp
      });
      for (let index = 0; index < response.data.results.length; index++) {
        temp[index] = response.data.results[index];
      }
      this.setState({
        cache: temp,
        count: response.data.count
      });
      if (this.state.selectedTags.length === 0) {
        const responseTag = await axios.get(
          "https://finewf.club:9900/api/bookblocks/?format=json"
        );
        this.setState({ tags: responseTag.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleBook = async page => {
    this.setState({
      loading: true
    });
    try {
      let url = "";
      if (this.state.fliterTag.length === 0) {
        url =
          "https://finewf.club:9900/api/books/?format=json" +
          "&page=" +
          page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search;
      } else {
        url =
          "https://finewf.club:9900/api/books/?format=json" +
          "&page=" +
          page +
          "&page_size=" +
          count +
          "&search=" +
          this.state.search +
          "&tag=" +
          this.state.fliterTag;
      }
      const response = await axios.get(url);
      let temp = this.state.cache;
      let i = (page - 1) * count;
      for (let index = 0; index < response.data.results.length; index++) {
        temp[i] = response.data.results[index];
        i++;
      }
      this.setState({
        cache: temp,
        loading: false
      });
      console.log(this.state.cache);
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async (tag, checked) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    await this.setState({
      selectedTags: nextSelectedTags,
      loading: true
    });
    const temp = [];
    for (let i of nextSelectedTags) {
      temp.push(i.id);
    }
    const fliterTag = temp.join("&tag=");
    await this.setState({
      fliterTag: fliterTag
    });
    this.getData();
    this.setState({
      loading: false
    });
  };

  search = async value => {
    await this.setState({
      loading: true,
      search: value
    });
    this.getData();
    this.setState({
      loading: false
    });
  };

  high = value => {
    return (
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={this.state.search.split(' ')}
        autoEscape={true}
        textToHighlight={value}
      />
    );
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <BackTop />
        <div style={{ flex: "1 0 ", backgroundColor: "#ffffff" }}>
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 10, offset: 5 }}
              xl={{ span: 13, offset: 2 }}
              md={{ span: 15, offset: 1 }}
              xs={{ span: 22, offset: 1 }}
              style={{ paddingTop: "0px", paddingBottom: "30px" }}
            >
              <div
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#262626",
                  color: "#ffffff",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  fontSize: "16px"
                }}
              >
                {this.state.search ? "搜索关键词 : " + this.state.search : null}
                <div>
                  {this.state.search ? "匹配条目数 : " : "全库条目数 : "}
                  {this.state.count}
                </div>
              </div>
              <List
                itemLayout="vertical"
                loading={this.state.loading}
                grid={{
                  gutter: 28,
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1
                }}
                pagination={{
                  onChange: this.handleBook,
                  pageSize: count,
                  total: this.state.cache.length,
                  showQuickJumper: true
                }}
                size="large"
                dataSource={this.state.cache}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <Link to={"/book/" + item.id}>
                        <div
                          style={{
                            padding: "20px",
                            background: "#fff",
                            borderRadius: "5px",
                            boxShadow: "0 1px 3px #999999"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column"
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "18px",
                                  color: "#3377aa",
                                  marginBottom: "5px",
                                  fontWeight: "600"
                                }}
                              >
                                {this.high(item.title)}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  margin: "10px 0"
                                }}
                              >
                                {item.tag &&
                                  item.tag.map(tag => (
                                    <Tag
                                      key={tag.title}
                                      color="#343a40"
                                      style={{ color: "white", margin: "5px" }}
                                    >
                                      {tag.title}
                                    </Tag>
                                  ))}
                              </div>
                              <Descriptions border gutter={24}>
                                <Descriptions.Item label="编号">
                                  {this.high(item.book_id)}
                                </Descriptions.Item>
                                <Descriptions.Item label="作者">
                                  {this.high(item.author)}
                                </Descriptions.Item>
                                <Descriptions.Item label="译者">
                                  {this.high(item.translator)}
                                </Descriptions.Item>
                                <Descriptions.Item label="出版社">
                                  {this.high(item.publisher)}
                                </Descriptions.Item>
                                <Descriptions.Item label="发行时间">
                                  {item.book_pub_date}
                                </Descriptions.Item>
                              </Descriptions>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </Col>
            <Col
              xxl={{ span: 4, offset: 0 }}
              xl={{ span: 7, offset: 0 }}
              md={{ span: 7, offset: 0 }}
              xs={{ span: 22, offset: 1 }}
              style={{ paddingLeft: "15px" }}
            >
              <Search
                placeholder="请输入书名含有的关键字"
                onSearch={value => this.search(value)}
                enterButton
                defaultValue={window.decodeURI(this.props.location.search.slice(8))}
              />
              <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
                style={{ paddingTop: "10px" }}
              >
                <Panel
                  header={<Title level={4}>全部标签</Title>}
                  key="1"
                  style={customPanelStyle}
                >
                  <List
                    size="small"
                    dataSource={this.state.tags}
                    renderItem={item => (
                      <List.Item>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            alignItems: "center"
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#ff5c38",
                              borderRadius: "16px 0 16px 16px",
                              padding: "5px 15px",
                              color: "white",
                              margin: "0 24px 0 0"
                            }}
                          >
                            {item.title}
                          </span>
                          {item.tags.map(tag => (
                            <CheckableTag
                              style={{
                                padding: "5px 10px",
                                borderRadius: "20px"
                              }}
                              key={tag}
                              checked={
                                this.state.selectedTags.indexOf(tag) > -1
                              }
                              onChange={checked =>
                                this.handleChange(tag, checked)
                              }
                            >
                              {tag.title}
                            </CheckableTag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}
export default BookPage;

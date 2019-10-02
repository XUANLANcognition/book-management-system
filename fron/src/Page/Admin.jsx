import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Button,
  Icon,
  Upload,
  message,
  Divider
} from "antd";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import xlsx from "xlsx";

import Nav from "../Nav";
import Myfooter from "../Myfooter";

import "./BookEditorPage.css";

const { Title } = Typography;

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true
};

class Admin extends Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = async () => {
    const { fileList } = this.state;

    fileList.forEach(file => {
      var reader = new FileReader();
      reader.onload = async e => {
        var data = new Uint8Array(e.target.result);
        var workbook = xlsx.read(data, { type: "array" });
        try {
          this.setState({
            uploading: true
          })
          let config = {
            headers: {
              Authorization: "Token " + window.localStorage.getItem("token")
            }
          };
           const response = await axios.post(
            "https://finewf.club:9900/api/upload_book",
            { data: xlsx.utils.sheet_to_json(workbook.Sheets["Sheet1"]) },
            config
          );
          this.setState({
            uploading: false
          })
          message.success('上传成功')
          message.info(response.data.success_lists)
        } catch (error) {
          message.error("上传失败");
          this.setState({
            uploading: false
          });
        }
      };
      reader.readAsArrayBuffer(file);
    });

    this.setState({
      uploading: false
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      listType: 'picture',
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Nav />
        <div style={{ flex: "1 0 ", backgroundColor: "#ffffff" }}>
          <Row style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <Col
              xxl={{ span: 12, offset: 6 }}
              xl={{ span: 16, offset: 4 }}
              xs={{ span: 22, offset: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline"
                }}
              >
                <Title level={3}>欢迎你</Title>
                <Divider type="vertical" />
                <Link to="/editor_guidance">上传数据帮助</Link>
              </div>
              <Dragger
                {...props}
                onChange={this.onChange}
                customRequest={this.customRequest}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
              <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    );
  }
}

export default Admin;

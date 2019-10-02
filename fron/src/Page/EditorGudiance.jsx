import React, { Component } from 'react'
import { Layout, Typography, Row, Col } from 'antd'

import Nav from '../Nav'
import Myfooter from '../Myfooter'

const { Title, Paragraph } = Typography

class EditorGuidance extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Nav />
        <div style={{ flex: '1 0 ', backgroundColor: '#fff' }}>
          <Row style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} xs={{ span: 22, offset: 1 }}>
              <Typography>
                <Title level={3}>数据上传步骤</Title>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  1. 下载标准的书籍记录 Excel ------
                  <a href='https://finewf.club:9900/static/admin/css/标准模板.xlsx'>点击下载</a>
                </Paragraph>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  2. 统计书籍数据到 Excel 中（注意 ：其中编号、书名为必须项，其他为选填项。必须项缺失则会导致该条目上传失败，选填项缺失可以成功上传，但会导致书籍数据不全）
                </Paragraph>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  3. 点击/拖拽上传数据
                </Paragraph>
                <Paragraph strong style={{ fontSize: '18px' }}>
                  4. 完成
                </Paragraph>
              </Typography>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default EditorGuidance

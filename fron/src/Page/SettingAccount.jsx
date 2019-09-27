import React, { Component } from 'react'
import { Layout, Col, Row, Menu, Icon, Typography, Tabs, Divider } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Nav from '../Nav'
import Myfooter from '../Myfooter'
import StepAuth from '../StepAuth'

const { Title } = Typography
const { TabPane } = Tabs

class SettingAccount extends Component {
  componentDidMount () {
    this.getProfileData()
  }

  state = {
    data: [],
    collapsed: false,
    bio: '',
    username: '',
    email: ''
  };

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  getProfileData = async (v) => {
    try {
      let config = {
        headers: { 'Authorization': 'Token ' + window.localStorage.getItem('token') }
      }
      const response = await axios.get(
        'https://finewf.club:8080/api/users/' + window.localStorage.getItem('user_id') + '?format=json',
        config
      )
      this.data = response.data.results
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name, bio: response.data.profile.bio, username: response.data.username, email: response.data.email }
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Nav />
        <div style={{ flex: '1 0' }}>
          <Row style={{ flex: '1 0', paddingTop: '20px' }} >
            <Col xxl={{ span: 3, offset: 5 }} xl={{ span: 4, offset: 2 }} md={{ span: 5, offset: 1 }} xs={{ span: 22, offset: 1 }} style={{ marginBottom: '20px' }}>
              <nav style={{ border: '1px solid #d1d5da', borderRadius: '3px' }}>
                <div style={{ backgroundColor: '#f3f5f8', color: '#586069', padding: '8px 16px', fontSize: '14px', lineHeight: '20px', borderBottom: '1px solid #e1e4e8', fontWeight: '800' }}>
                  个人设置
                </div>
                <Link to='/settings/profile'>
                  <div style={{ padding: '8px 10px', display: 'block', borderBottom: '1px solid #e1e4e8', color: '#0366d6' }}>
                    <Icon type='user' style={{ paddingRight: '6px' }} />个人信息
                  </div>
                </Link>
                <Link to='/settings/account'>
                  <div style={{ padding: '8px 10px', display: 'block', color: '#24292e', fontWeight: '600', cursor: 'default', borderLeft: '3px solid #e36209' }}>
                    <Icon type='user' style={{ paddingRight: '6px' }} />账号设置
                  </div>
                </Link>
              </nav>
            </Col>
            <Col xxl={{ span: 11, offset: 0 }} xl={{ span: 16, offset: 0 }} md={{ span: 16, offset: 0 }} xs={{ span: 22, offset: 1 }} style={{ paddingLeft: '15px' }} >
              <div style={{ padding: '0 10px ' }}>
                <Row>
                  <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                    <div style={{ fontSize: '20px', borderBottom: '1px solid #e1e4e8', paddingBottom: '8px', fontWeight: '600', color: '#24292e' }}>
                    账号设置
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col xl={{ span: 24, offset: 0 }} xs={{ span: 22, offset: 1 }}>
                    <Tabs defaultActiveKey='1'>
                      <TabPane
                        tab={
                          <span>
                            <Icon type='apple' />权限申请
                          </span>
                        }
                        key='1'
                      >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                          <Title style={{ padding: '24px 0' }} level={4}>1.书籍影视资源编辑</Title>
                          <Divider type='vertical' />
                          <Link to='/editor_guidance'>编辑须知</Link>
                        </div>
                        <StepAuth />
                      </TabPane>
                      <TabPane
                        tab={
                          <span>
                            <Icon type='android' />敬请期待
                          </span>
                        }
                        key='2'
                      >
                        Tab 2
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <Myfooter />
      </Layout>
    )
  }
}

export default SettingAccount

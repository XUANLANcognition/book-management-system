import React, { Component } from 'react'
import { Icon, Row, Col, Avatar, Popover } from 'antd'
import { Link } from 'react-router-dom'

import ProfileCard from './ProfileCard'
import './Nav.css'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1441857_phyre87dyv.js'
})

const Card = (
  <div style={{ width: '176px', boxShadow: '0px 2px 5px #888888' }}>
    <ProfileCard />
  </div>
)

class Nav extends Component {
  render () {
    return (
      <Row style={{ backgroundColor: '#8f000b' }}>
        <Col xxl={{ span: 14, offset: 5 }} xl={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
          <div style={{ backgroundColor: '#8f000b', color: '#fff', lineHeight: '56px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <div style={{ paddingRight: '24px', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <Link to='/' >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconFont className='nav-icon-1' type='iconlishi'/>
                  <div className='nav-font-1'>
                    历史资料室
                  </div>
                </div>
              </Link>
            </div>

            <Link to='/'>
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont className='nav-icon-2' type='iconyingyongzhongxin'/>
                <div className='nav-font-2'>  
                   主页
                </div>
              </div>
            </Link>

            <Link to='/book' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont className='nav-icon-2' type='icontushu'/>
                <div className='nav-font-2'>
                书库
                </div>
              </div>
            </Link>

            <Link to='/notice' >
              <div style={{ width: '96px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <IconFont className='nav-icon-2' type='iconxinxi'/>
                <div className='nav-font-2'>
                通知
                </div>
              </div>
            </Link>

            <div style={{ display: 'flex', flexGrow: '1', flexDirection: 'row-reverse', alignItems: 'center' }}>
              <div>
                <Link to='#'>
                  <Popover content={Card} placement='bottomRight' trigger='click' >
                    <Icon className='nav-icon-2' type='setting'></Icon>
                  </Popover>
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>

    )
  }
}

export default Nav

import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const { Sider } = Layout

const AppAside: React.FC = () => {
  const menu = [
    { title: 'Movie', key: 'movie', path: 'movie', icon: <VideoCameraOutlined /> },
    { title: 'User', key: 'user', path: 'user', icon: <UserOutlined /> },
  ]

  return (
    <Sider breakpoint="lg" collapsedWidth="0" className="h-screen">
      <div className="flex justify-center items-center" style={{ height: '64px' }}>
        Movie Paradise Admin
      </div>
      <Menu theme="dark" defaultSelectedKeys={['movie']}>
        {menu.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

export default AppAside

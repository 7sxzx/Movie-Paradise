import { Layout } from 'antd'
import React from 'react'
import AppAside from './AppAside'
import AppHeader from './AppHeader'

const { Content } = Layout

interface Props {
  children: React.ReactChild
}

const AppLayout: React.FC<Props> = ({ children }: Props) => (
  <Layout>
    <AppAside />
    <Layout>
      <AppHeader />
      <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
    </Layout>
  </Layout>
)

export default AppLayout

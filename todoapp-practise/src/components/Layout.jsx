/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ProfileOutlined,
  SettingOutlined,
  ContactsOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
const DEFAULT_ITEM = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Home",
  },
  {
    key: "sub1",
    icon: <UserOutlined />,
    label: "Admin",
    children: [
      {
        key: "3",
        icon: <SettingOutlined />,
        label: "Settings",
      },
      {
        key: "4",
        icon: <ProfileOutlined />,
        label: "Profile",
      },
    ],
  },
  {
    key: "5",
    icon: <ContactsOutlined />,
    label: "Contract",
  },
];

const LayoutAntd = ({
  menus = DEFAULT_ITEM,
  themeInit = "dark",
  collapsedInit = false,
  defaultSelectedKeysInit = "3",
  defaultOpenKeysInit = "sub1",
  license = `Note App ${new Date().getFullYear()} Created by LinhHehe`,
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(collapsedInit);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme={themeInit}
          defaultSelectedKeys={defaultSelectedKeysInit}
          defaultOpenKeys={defaultOpenKeysInit}
          mode="inline"
          items={menus}
          {...props}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              minHeight: "100%",
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {license}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAntd;

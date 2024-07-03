/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { HomeOutlined, EditTwoTone, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const DEFAULT_ITEM = [
//   getItem("Option 1", "1", <PieChartOutlined />),
//   getItem("Option 2", "2", <DesktopOutlined />),
//   getItem("User", "sub1", <UserOutlined />, [
//     getItem("Tom", "3"),
//     getItem("Bill", "4"),
//     getItem("Alex", "5"),
//   ]),
//   getItem("Team", "sub2", <TeamOutlined />, [
//     getItem("Team 1", "6"),
//     getItem("Team 2", "8"),
//   ]),
//   getItem("Files", "9", <FileOutlined />),
// ];
// eslint-disable-next-line react/prop-types
// TODO: check connect router to this Layout
const DEFAULT_ITEM = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    isActive: false,
  },
  {
    key: "2",
    icon: <EditTwoTone />,
    label: "Note",
    isActive: true,
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "Setting",
    children: [
      {
        key: "4",
        icon: <HomeOutlined />,
        label: "Profile",
        isActive: false,
      },
      {
        key: "5",
        icon: <HomeOutlined />,
        label: "Layout",
        isActive: true,
      },
    ],
  },
];

const LayoutAntd = ({
  menus = DEFAULT_ITEM,
  themeNameInit = "dark",
  collapsedInit = false,
  defaultSelectedKeysInit = "4",
  defaultOpenKeysInit = "sub1",
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);
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
          theme={themeNameInit}
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAntd;

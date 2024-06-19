import { Outlet } from "react-router-dom";
import LayoutAntd from "../antd/Layout";
import { rootConfig } from "../config/router";

const RootLayout = () => {
  return (
    <>
      <LayoutAntd
        onClick={(e) => {
          console.log("e", e);
        }}
        menus={getMenus(rootConfig)}
      >
        <Outlet />
      </LayoutAntd>
    </>
  );
};

export default RootLayout;

const getMenus = (rootConfig = rootConfig) => {
  return rootConfig.map((root) => {
    if (root.menu?.key) {
      return {
        key: root.menu.key,
        icon: root.menu.icons,
        label: root.menu.label,
        children: root?.children ? getMenus(root.children) : undefined,
      };
    }
    return null;
  });
};

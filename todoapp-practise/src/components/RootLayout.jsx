import { Outlet, useNavigate } from "react-router-dom";
import LayoutAntd from "../antd/Layout";
import { rootConfig } from "../config/router";

const RootLayout = () => {
  const menuConfig = rootConfig[0].children;
  // TODO: Solve something here for logic menu
  const menus = getMenus(menuConfig);
  //
  const { defaultOpenKeysInit, defaultSelectedKeysInit } =
    getDefaultSelectedAndOpenKeys();
  const navigate = useNavigate();

  const handleOnClickLayout = (e) => {
    const { keyPath } = e;
    const path = keyPath.reverse().join("/");
    navigate(path);
  };

  return (
    <>
      <LayoutAntd
        onClick={handleOnClickLayout}
        defaultSelectedKeysInit={defaultSelectedKeysInit}
        defaultOpenKeysInit={defaultOpenKeysInit}
        menus={menus}
      >
        <Outlet />
      </LayoutAntd>
    </>
  );
};

export default RootLayout;

//TODO: fix something here for logic menu
const getMenus = (menuConfig) => {
  return menuConfig.map((root) => {
    if (root.menu?.key) {
      return {
        key: root.menu.key,
        icon: root.menu.icon,
        label: root.menu.label,
        children:
          root.children && root.children.length > 0
            ? getMenus(root.children)
            : undefined,
      };
    }
    return null;
  });
};

const getDefaultSelectedAndOpenKeys = () => {
  const currentPath = window.location.pathname;
  const path = currentPath.split("/").filter((item) => item);
  const defaultOpenKeysInit = path[path.length - 1] || "home";
  const defaultSelectedKeysInit = path.slice(0, path.length - 1).join("/");
  return {
    defaultOpenKeysInit,
    defaultSelectedKeysInit,
  };
};

import { Outlet, useNavigate } from "react-router-dom";
import LayoutAntd from "./Layout";
import { rootConfig } from "../pages/routers/root";

const RootLayout = () => {
  const menuConfig = rootConfig[0].children;
  const menus = getMenus(menuConfig);
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

const getMenus = (menuConfig) => {
  const getRawMenus = (menuConfig) => {
    return menuConfig
      .filter((root) => root.menu)
      .map((root) => {
        if (root.menu?.key) {
          return {
            key: root.menu.key,
            icon: root.menu.icon,
            label: root.menu.label,
            children:
              root.children && root.children?.length > 0
                ? getRawMenus(root.children)
                : undefined,
          };
        }
        return null;
      });
  };
  return getRawMenus(menuConfig).map((menu) => {
    let chidlren = [];
    if (menu?.children && menu?.children?.length > 0) {
      chidlren = menu.children.filter((item) => item);
    }
    if (chidlren.length === 0 && menu?.key) {
      return {
        key: menu?.key,
        icon: menu?.icon,
        label: menu?.label,
      };
    }
    return { ...menu };
  });
};
// TODO: defaultMenu here ???
const isKeyInMenus = (key, menus) => {
  for (const item of menus) {
    if (item.key === key) {
      return true;
    }
    if (item.chidlren && item.chidlren.length > 0) {
      if (isKeyInMenus(key, item.chidlren)) {
        return true;
      }
    }
  }
  return false;
};

const getDefaultSelectedAndOpenKeys = (menus) => {
  const currentPath = window.location.pathname;
  const path = currentPath.split("/").filter((item) => item);
  // defaultSelectedKeysInit la key trong default menu
  // TODO: solve default Init here
  let defaultSelectedKeysInit = path[path.length - 1] || "home";
  const defaultOpenKeysInit = path.slice(0, 1).join("/");
  if (menus && !isKeyInMenus(defaultOpenKeysInit, menus)) {
    defaultSelectedKeysInit = defaultOpenKeysInit;
  }
  //TODO: solve to hover menu of children of note here
  return { defaultSelectedKeysInit, defaultOpenKeysInit };
};

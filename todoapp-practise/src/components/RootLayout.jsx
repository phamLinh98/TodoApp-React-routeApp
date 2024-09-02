import { Outlet, useNavigate } from 'react-router-dom';
import { rootConfig } from '../routers/root';
import LayoutAntd from './Layout';

const RootLayout = () => {
  const menusConfig = rootConfig[0].children;
  const menus = getMenus(menusConfig);
  const { defaultSelectedKeysInit, defaultOpenKeysInit } = getDefaultSelectedAndOpenKeys(menus);
  const navigate = useNavigate();

  const handleOnClickLayout = (e) => {
    const { keyPath } = e;
    const path = keyPath.reverse().join('/');
    navigate(path);
  };

  return (
    <LayoutAntd
      onClick={handleOnClickLayout}
      defaultSelectedKeysInit={defaultSelectedKeysInit}
      defaultOpenKeysInit={defaultOpenKeysInit}
      menus={menus}
    >
      <Outlet />
    </LayoutAntd>
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
            children: root.children && root.children?.length > 0 ? getRawMenus(root.children) : undefined,
          };
        }
        return null;
      });
  };
  return getRawMenus(menuConfig).map((menu) => {
    let children = [];
    if (menu?.children && menu?.children?.length > 0) {
      children = menu.children.filter((child) => child);
    }
    if (children.length === 0 && menu?.key) {
      return {
        key: menu?.key,
        icon: menu?.icon,
        label: menu?.label,
      };
    }
    return { ...menu };
  });
};

const isKeyInMenus = (key, menus) => {
  for (const item of menus) {
    if (item.key === key) {
      return true;
    }
    if (item.children && item.children.length > 0) {
      if (isKeyInMenus(key, item.children)) {
        return true;
      }
    }
  }
  return false;
};

const getDefaultSelectedAndOpenKeys = (menus) => {
  const currentPath = window.location.pathname;
  const path = currentPath.split('/').filter((item) => item);
  let defaultSelectedKeysInit = path[path.length - 1] || 'home';
  const defaultOpenKeysInit = path.slice(0, 1).join('/');
  if (menus && !isKeyInMenus(defaultSelectedKeysInit, menus)) {
    defaultSelectedKeysInit = defaultOpenKeysInit;
  }
  return { defaultSelectedKeysInit, defaultOpenKeysInit };
};

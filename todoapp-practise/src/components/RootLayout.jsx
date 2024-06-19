import { Outlet } from "react-router-dom";
import LayoutAntd from "../antd/Layout";
import { rootConfig } from "../config/router";

const getMenu = (menus) => {
  return menus.map((item) => {
    return {
      key: item.menu.key,
      icon: item.menu.icons,
      label: item.menu.label,
      children: item.children ? getMenu(item.children) : undefined,
    };
  });
};
const RootLayout = () => {
  return (
    <>
      <LayoutAntd
        onClick={(e) => {
          console.log("e", e);
        }}
        menu={getMenu}
      >
        <Outlet />
      </LayoutAntd>
    </>
  );
};

export default RootLayout;

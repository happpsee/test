/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 13:35:39
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 22:46:45
 * @FilePath: \RBAC\src\Layout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Menu, Select } from "antd";
import { useNavigate, Outlet } from "react-router"
import { usePermissionMenu } from "./hooks/usePermiMenu";
import { routeMenuMap } from "./routes/menuRoutes";
import { useDispatch, useSelector } from "react-redux";
import { switchRole } from "./stores/slices/user";

const Layout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleResource = useSelector((state: RootState) => state.role.roles);
  const userResource = useSelector((state:RootState) => state.user.role);
  const roleList = Object.keys(roleResource).map(item => ({label: item,value: item}));

  const menuClick = (payload: { keyPath: string[] }) => {
    navigate(payload.keyPath[0]);
  };

  const menu = usePermissionMenu(routeMenuMap);

  const selectChange = (value:string[]) => {
    dispatch(switchRole(value));
  };

  
  return (<div style={{ display: "flex", width: "100vw", height: "100vh" }}>
    <div style={{ width: "300px", height: "100%" }}>
      <Menu
        theme="dark"
        mode="inline"
        items={menu}
        style={{
          height: "100%"
        }}
        onClick={menuClick}
      >
      </Menu>
    </div>

    <div style={{ flex: "1" }}>
      <div style={{height: "60px", width: "100%", background: "linear-gradient(135deg, #c850c0, #4158d0)"}}>

        <Select 
        mode="tags"
        defaultValue={userResource as any}
        style={{width: 200}}
        onChange={selectChange}
        options={roleList}
        ></Select>

      </div>
      <Outlet></Outlet>
    </div>

  </div>)
};


export default Layout;